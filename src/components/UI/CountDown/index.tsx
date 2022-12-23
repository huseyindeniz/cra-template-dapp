import React from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { ShortDate } from "../DateFormatter/ShortDate";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
};

const renderTime = (dimension: string, time: number) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time: number) =>
  ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time: number) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time: number) => (time / daySeconds) | 0;

export interface CountDownProps {
  endTime: Date;
  label: string;
  onComplete: () => void;
}

export const CountDown: React.FC<CountDownProps> = ({
  endTime,
  label,
  onComplete,
}) => {
  const startTime = Date.now(); // use UNIX timestamp in seconds

  const remainingTime = (endTime.getTime() - startTime) / 1000;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <VStack>
      <ShortDate date={endTime} label={label} />
      <HStack>
        <CountdownCircleTimer
          {...timerProps}
          colors="#7E2E84"
          duration={daysDuration}
          initialRemainingTime={remainingTime}
          size={80}
          onComplete={onComplete}
        >
          {({ elapsedTime, color }) => (
            <Text
              as={"span"}
              style={{ color }}
              textAlign="center"
              fontSize={"sm"}
            >
              {renderTime("days", getTimeDays(daysDuration - elapsedTime))}
            </Text>
          )}
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors="#D14081"
          duration={daySeconds}
          initialRemainingTime={remainingTime % daySeconds}
          size={80}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
          })}
        >
          {({ elapsedTime, color }) => (
            <Text
              as={"span"}
              style={{ color }}
              textAlign="center"
              fontSize={"sm"}
            >
              {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
            </Text>
          )}
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors="#EF798A"
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          size={80}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
          })}
        >
          {({ elapsedTime, color }) => (
            <Text
              as={"span"}
              style={{ color }}
              textAlign="center"
              fontSize={"sm"}
            >
              {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
            </Text>
          )}
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors="#218380"
          duration={minuteSeconds}
          initialRemainingTime={remainingTime % minuteSeconds}
          size={80}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > 0,
          })}
        >
          {({ elapsedTime, color }) => (
            <Text
              as={"span"}
              style={{ color }}
              textAlign="center"
              fontSize={"sm"}
            >
              {renderTime("seconds", getTimeSeconds(elapsedTime))}
            </Text>
          )}
        </CountdownCircleTimer>
      </HStack>
    </VStack>
  );
};
