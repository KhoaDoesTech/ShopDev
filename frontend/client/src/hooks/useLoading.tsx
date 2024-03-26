import imagesLoaded from "imagesloaded";
import { useEffect, useState } from "react";

function useLoading({ selector }: { selector: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPage, setShowPage] = useState(false);
  function initLoading() {
    const images = document.querySelectorAll(".figure-img");
    const totalImages = images.length;
    let loadedImages = 0;

    imagesLoaded(selector, { background: true }, function () {
      console.log("images loaded");
    })
      .on("always", () => {
        console.log("always");
      })
      .on("progress", () => {
        loadedImages++;
        const percent = Math.floor((loadedImages / totalImages) * 100);
      })
      .on("done", () => {
        console.log("done");
        setIsLoaded(true);
        setProgress(100);
        setTimeout(() => {
          setShowPage(true);
        }, 2000);
      });
  }
  useEffect(() => {
    initLoading();
  }, []);
  return { isLoaded, progress, showPage };
}

export default useLoading;
