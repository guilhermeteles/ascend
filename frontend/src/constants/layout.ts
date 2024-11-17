export const headerHeight = (): number => {
    const header = document.getElementById('header');
    return header ? header.offsetHeight : 0; // Return the height as a number
  };
  
  export const footerHeight = (): number => {
    const footer = document.getElementById('footer');
    return footer ? footer.offsetHeight : 0; // Return the height as a number
  };

export const paddingX = 'px-20'
