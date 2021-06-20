const inputValidator = (field) => {
    const rex = /\d+|\w+/;
    return !!rex.exec(field.value);
  };

  const sortOwls = (data) => data.sort((owl1, owl2) => owl1.score - owl2.score);

const storeOwl = (owl) => {
  const obj = JSON.stringify(owl);
  localStorage.setItem('owl', obj);
};

const retrieveOwl = () => {
  const obj = localStorage.getItem('owl') ? JSON.parse(localStorage.getItem('owl')) : 0;
  return obj;
};

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
    storeOwl,
    retrieveOwl,
    eltBuilder
}