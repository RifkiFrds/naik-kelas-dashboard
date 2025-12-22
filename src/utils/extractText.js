export const extractTextFromHTML = (html, limit = 120) => {
  if (!html) return "";

  const temp = document.createElement("div");
  temp.innerHTML = html;

  const text = temp.textContent || temp.innerText || "";
  return text.length > limit
    ? text.slice(0, limit) + "..."
    : text;
};
