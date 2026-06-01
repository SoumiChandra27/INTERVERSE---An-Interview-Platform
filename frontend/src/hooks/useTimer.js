import {
  useEffect,
  useState
} from "react";
export default function useTimer(
  minutes
) {
  const [seconds, setSeconds] =
    useState(minutes * 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return seconds;
}