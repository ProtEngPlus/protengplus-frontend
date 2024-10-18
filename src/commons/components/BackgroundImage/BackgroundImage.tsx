import defaultBg from "../../../assets/images/defaultBg.svg";

export default function BackgroundImage({ children }: { children?: any }) {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-black bg-center bg-no-repeat overflow-x-hidden"
      style={{ backgroundImage: `url(${defaultBg})` }}
    >
      <div className="relative w-full top-0 left-0">{children}</div>
    </div>
  );
}
