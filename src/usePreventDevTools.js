import { useEffect, useState } from "react";

// Function to wait for a specified time before resolving
const waitForControl = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(); // Resolve the Promise when the timer is complete
    }, time);
  });
};

// Function to lock the application in a loop, potentially for debugging purposes
const lock = async () => {
  do {
    debugger; // Pause execution for debugging
    await waitForControl(500); // Wait asynchronously
    debugger; // Another pause for debugging
  } while (true); // Continue the loop indefinitely
};

const usePreventDevTools = ({ lockDevTools = false } = {}) => {
  const [devtoolsOpen, setDevtoolsOpen] = useState(false); // State to track if DevTools are open,ü

  useEffect(() => {
    if (lockDevTools) {
      lock();
    }

    const threshold = 170; // Size threshold to detect if DevTools are open

    // Function to detect if DevTools are open based on window size
    const detectDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold; // Check width difference
      const heightThreshold =
        window.outerHeight - window.innerHeight > threshold; // Check height difference

      // If either width or height threshold is exceeded, DevTools are considered open
      if (widthThreshold || heightThreshold) {
        if (!devtoolsOpen) {
          console.log("DevTools detected!"); // Log when DevTools are detected,
          setDevtoolsOpen(true); // Set state to indicate DevTools are open
        }
      } else {
        // If DevTools were open and are now closed
        if (devtoolsOpen) {
          console.log("DevTools closed!"); // Log when DevTools are closed
          setDevtoolsOpen(false); // Set state to indicate DevTools are closed
        }
      }
    };

    // Function to handle key press events
    const handleKeyPress = (event) => {
      // If the F12 key is pressed, prevent the default action and show an alert
      if (event.key === "F12") {
        event.preventDefault();
        alert("Developer tools are disabled."); // Notify user that DevTools are disabled
      }
    };

    // Add event listeners to detect DevTools and handle key presses
    window.addEventListener("resize", detectDevTools); // Detect DevTools on window resize
    document.addEventListener("keydown", handleKeyPress); // Handle key press events

    // Initial check to see if DevTools are open
    detectDevTools();

    // Set an interval to check for DevTools periodically
    const intervalId = setInterval(detectDevTools, 500); // Check every 500ms

    // If lockDevTools is true, start the lock function

    // Cleanup function to remove event listeners and clear the interval
    return () => {
      clearInterval(intervalId); // Clear the interval on component unmount
      window.removeEventListener("resize", detectDevTools); // Remove resize listener
      document.removeEventListener("keydown", handleKeyPress); // Remove keydown listener
    };
  }, [devtoolsOpen, lockDevTools]); // Dependencies for useEffect

  return devtoolsOpen; // Return the state of DevTools (open or closed)
};

export default usePreventDevTools;
