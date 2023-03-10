import { useEffect, useState, useContext, useRef } from 'react';
import { SidebarContext } from '../../MainContent';

const usePopup = (props, buttonRef) => {
  const { setIsPopupVisible } = useContext(SidebarContext);
  const dropdownRef = useRef();

  const [isDropdown, setIsDropdown] = useState(false);

  const getRight = () => {
    if (!buttonRef.current) return;
    const pickerRightLoc = buttonRef.current.getBoundingClientRect().left + 270;
    // if greater than 0 nothing, if less right: 0
    return window.innerWidth - pickerRightLoc < 0 ? { right: 0 } : {};
  };

  useEffect(() => {
    const showPopup = () => {
      setIsPopupVisible(true);
      setIsDropdown(true);
    };
    const hidePopup = () => {
      setIsPopupVisible(false);
      setIsDropdown(false);
    };
    const handleClick = (e) => {
      if (!buttonRef.current) return;
      if (buttonRef.current.contains(e.target) && !isDropdown)
        return showPopup();

      if (!dropdownRef.current) return;

      // console.log(e.target)
      // console.log(dropdownRef.current)
      // console.log(isDropdown && !dropdownRef.current.contains(e.target))

      if (isDropdown && !dropdownRef.current.contains(e.target))
        return hidePopup();
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isDropdown) hidePopup();
    };
    window.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDropdown, buttonRef, setIsPopupVisible]);

  return props.data
    ? {
        isDropdown,
        style: getRight(),
        ref: dropdownRef,
        propId: props.data.name.toLowerCase(),
        data: props.data,
      }
    : { isDropdown, style: getRight(), ref: dropdownRef, setIsDropdown };
};

export default usePopup;