const inputValidator = (field) => {
    const rex = /\d+|\w+/;
    return !!rex.exec(field.value);
  };

  const sortOwls = (data) => data.sort((owl1, owl2) => owl2.score - owl1.score);


const eltBuilder = (name, attrs, ...children) => {
    const dom = document.createElement(name);
  
    Object.entries(attrs).forEach(([key, value]) => {
      dom.setAttribute(key, value);
    });
  
    [...children].forEach((child) => dom.appendChild(child));
  
    return dom;
  };

export {
    inputValidator,
    sortOwls,
    eltBuilder
}