export const headerHeight = (): number => {
    const header = document.getElementById('header');
    return header ? header.offsetHeight : 0; // Return the height as a number
  };
  
  export const footerHeight = (): number => {
    const footer = document.getElementById('footer');
    return footer ? footer.offsetHeight : 0; // Return the height as a number
  };

export const paddingX = 'px-20'

export const pagePaddingY = 'py-20'

export const profileColors = [
  "#f87171", // Red
  "#fbbf24", // Yellow
  "#34d399", // Green
  "#60a5fa", // Blue
  "#a78bfa", // Purple
  "#f472b6", // Pink
];