import React from 'react';

function SectionInput({ sections, name, handleSection, handleSelect }) {
  return (
    <div>
      <input name={name} value={sections[name].value} onChange={handleSection} />
      <select name={name} value={sections[name].dir} onChange={handleSelect}>
        <option>N</option>
        <option>S</option>
      </select>
    </div>
  )
}

export default SectionInput;