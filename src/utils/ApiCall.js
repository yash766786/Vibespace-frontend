export const apiCall = async (url, options = {}, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout); // Timeout after 10 seconds by default

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal, // Attach the abort signal
    });

    clearTimeout(id); // Clear timeout if response is received on time

    if (!response.ok) {
      const error = await response.json();
      return { success: false, message: error.message || "Request failed" };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    clearTimeout(id); // Ensure timeout is cleared in case of error
    if (error.name === "AbortError") {
      return { success: false, message: "Request timed out" };
    }
    return { success: false, message: error.message || "An error occurred" };
  }
};
