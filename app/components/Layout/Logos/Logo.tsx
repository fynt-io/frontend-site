export default function Logo({
  style = 3,
  responsiveMode = false,
  forceResponsive = false,
  height = 60,
  width = 200,
  className = "",
}) {
  // Return different logos based on style
  function returnLogoImage() {
    switch (style) {
      case 1:
        const forceResponsiveLogo = "bg-[url('/logo/logo-bren-1-r.svg')] dark:bg-[url('/logo/logo-bren-2-r.svg')]";
        const responsiveLogo = "bg-[url('/logo/logo-bren-1-r.svg')] dark:bg-[url('/logo/logo-bren-2-r.svg')] lg:bg-[url('/logo/logo-bren-1.svg')] lg:dark:bg-[url('/logo/logo-bren-2.svg')]";
        const desktopLogo = "bg-[url('/logo/logo-bren-1.svg')] dark:bg-[url('/logo/logo-bren-2.svg')]";
        return forceResponsive ? forceResponsiveLogo : responsiveMode ? responsiveLogo : desktopLogo;
      case 2:
        const forceResponsiveLogo2 = "bg-[url('/logo/logo-bren-2-r.svg')] dark:bg-[url('/logo/logo-bren-3-r.svg')]";
        const responsiveLogo2 = "bg-[url('/logo/logo-bren-2-r.svg')] dark:bg-[url('/logo/logo-bren-3-r.svg')] lg:bg-[url('/logo/logo-bren-2.svg')] lg:dark:bg-[url('/logo/logo-bren-3.svg')]";
        const desktopLogo2 = "bg-[url('/logo/logo-bren-2.svg')] dark:bg-[url('/logo/logo-bren-3.svg')]";
        return forceResponsive ? forceResponsiveLogo2 : responsiveMode ? responsiveLogo2 : desktopLogo2;
      case 3:
        const forceResponsiveLogo3 = "bg-[url('/logo/logo-bren-3-r.svg')] dark:bg-[url('/logo/logo-bren-3-r.svg')]";
        const responsiveLogo3 = "bg-[url('/logo/logo-bren-3-r.svg')] dark:bg-[url('/logo/logo-bren-3-r.svg')] lg:bg-[url('/logo/logo-bren-3.svg')] lg:dark:bg-[url('/logo/logo-bren-3.svg')]";
        const desktopLogo3 =  "bg-[url('/logo/logo-bren-3.svg')] dark:bg-[url('/logo/logo-bren-3.svg')]";
        return forceResponsive ? forceResponsiveLogo3 : responsiveMode ? responsiveLogo3 : desktopLogo3;
      default:
        const forceResponsiveLogo4 = "bg-[url('/logo/logo-bren-1-r.svg')] dark:bg-[url('/logo/logo-bren-2-r.svg')]";
        const responsiveLogo4 = "bg-[url('/logo/logo-bren-1-r.svg')] dark:bg-[url('/logo/logo-bren-2-r.svg')] lg:bg-[url('/logo/logo-bren-1.svg')] lg:dark:bg-[url('/logo/logo-bren-2.svg')]";
        const desktopLogo4 = "bg-[url('/logo/logo-bren-1.svg')] dark:bg-[url('/logo/logo-bren-2.svg')]";
        return forceResponsive ? forceResponsiveLogo4 : responsiveMode ? responsiveLogo4 : desktopLogo4;
    }
  }

  return (
    <div className={`logoArea overflow-hidden flex w-full h-[${height}px] items-center justify-center  ${className}`}>
      <div
        className={`full-${style}-logo${responsiveMode ? "-responsive" : ""} bg-contain bg-no-repeat bg-center ${returnLogoImage()}`}
        style={{ height: height + "px", width: width + "px" }}
      />
    </div>
  );
}
