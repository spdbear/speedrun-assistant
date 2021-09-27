import React, { useState, useEffect } from "react";
import {
  Heading,
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Text,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Data } from "./types/Data";
// import { getSheetData, authenticate } from "./client/spreadsheet";

const data: Data[] = [
  {
    id: 1,
    split: "区間1",
    todo: [
      { type: "action", content: "「はじめから」でタイマースタート" },
      { type: "action", content: "東へ向かう" },
      { type: "action", content: "hoge村に入る" },
      { type: "action", content: "剣と盾を買う" },
      { type: "action", content: "剣と盾を買う" },
    ],
  },
  {
    id: 2,
    split: "区間2",
    todo: [
      { type: "action", content: "レベルを10まで上げる" },
      { type: "action", content: "お金を1000Gまで稼ぐ" },
      { type: "action", content: "ボスを倒す" },
    ],
  },
  {
    id: 3,
    split: "区間3",
    todo: [
      { type: "action", content: "西へ向かう" },
      { type: "action", content: "ラストダンジョンに入る" },
      { type: "action", content: "最強の剣を手に入れる" },
      { type: "action", content: "ラスボスを倒す" },
      { type: "action", content: "エンディングが流れたらタイマーストップ" },
    ],
  },
];

const generateTodoList = (data: Data[], splitName: string) =>
  data
    .filter((e) => e.split === splitName)
    .flatMap((e) => e.todo)
    .map((el) => {
      if (el.type === "action") {
        return <li>{el.content}</li>;
      } else if (el.type === "coin") {
        return <li>コイン: {el.cid}</li>;
      } else if (el.type === "pic") {
        return <li>プチクラ: {el.pid}</li>;
      } else if (el.type === "move") {
        return <li>{el.content}</li>;
      } else if (el.type === "equip") {
        return <li>装備: {el.content}</li>;
      } else {
        return <li>error</li>;
      }
    });

export const App = () => {
  const url = "ws://localhost:16835/livesplit";
  const client = new WebSocket(url);

  useEffect(() => {
    const commandList = ["start", "split", "skipSplit", "undoSplit", "reset"];

    client.onopen = () => {
      console.log(`Success to connect ${url}`);
      client.send(`registerEvent ${commandList.join(" ")}`);
    };

    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      const name = data.name;
      switch (name) {
        case "getdelta":
          setCurrentDelta(data.data);
          console.log(`delta: ${data.data / 1000}s`);
          break;
        case "getcurrentsplitname":
          setCurrentSplitName(data.data);
          console.log(`name: ${data.data}`);
          break;
        case "getcurrenttime":
          setCurrentTime(data.data);
          console.log(`last split time: ${data.data / 1000}s`);
          break;
      }
      console.log(data);
      if (commandList.includes(name)) {
        if (name === "reset") {
          setCurrentDelta(0);
          setCurrentTime(0);
          setCurrentSplitName("");
          return;
        }
        client.send("getdelta");
        client.send("getcurrentsplitname");
        client.send("getcurrenttime");
      }
    };
    console.log(`Started WS Client to ${url}`);
  }, []);
  const [currentSplitName, setCurrentSplitName] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [currentDelta, setCurrentDelta] = useState(0);
  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          {/* <Button onClick={authenticate}> Authenticate </Button> */}
          {/* <Button onClick={getSheetData}> Get Data </Button> */}
          <VStack spacing={2}>
            <Text>
              Time: {currentTime / 1000}s, +/-: {currentDelta / 1000}s
            </Text>
            <Heading>
              {data.find((e) => e.split === currentSplitName)?.split}
            </Heading>
            <ul>{generateTodoList(data, currentSplitName)}</ul>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
