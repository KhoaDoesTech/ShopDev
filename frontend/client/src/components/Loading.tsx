import clsx from "clsx";
interface LoadingProps {
  isLoaded: boolean;
  progress: number;
}
function Loading(props: LoadingProps) {
  const { isLoaded, progress } = props;
  return (
    <div
      id="loading-container"
      className={clsx(
        { "fade-out": isLoaded },
        "w-screen h-screen flex justify-center flex-col items-center bg-gray-800"
      )}
    >
      <div className="w-[200px] h-2 rounded-md relative mb-4 bg-gray-300 overflow-hidden ">
        <div
          className="h-full bg-[#021951]"
          id="progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <h1 className="text-center text-sm">{progress}%</h1>
    </div>
  );
}

export default Loading;
