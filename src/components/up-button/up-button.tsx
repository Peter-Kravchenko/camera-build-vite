function UpButton() {
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <a onClick={scrollToTop} className="up-btn">
      <svg width="12" height="18" aria-hidden="true">
        <use href="#icon-arrow2"></use>
      </svg>
    </a>
  );
}

export default UpButton;
