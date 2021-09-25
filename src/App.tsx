import React, { useState } from "react";
import {
  Heading,
  ChakraProvider,
  Box,
  VStack,
  Input,
  Grid,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Data } from "./types/Data";

const data: Data[] = [
  {
    id: 1,
    split: "ジェットタービン",
    todo: [
      {
        type: "action",
        content: "アクセルの家へ",
        notes: "Vジャンプ1",
      },
      {
        type: "coin",
        cid: 6,
      },
      {
        type: "move",
        content: "道に沿って東へ進む",
      },
      {
        type: "action",
        content: "ボトルを拾う",
      },
      {
        type: "coin",
        cid: 94,
      },
      {
        type: "coin",
        cid: 99,
      },
      {
        type: "action",
        content: "Q'sファクトリーへ",
      },
      {
        type: "action",
        content: "ココナッツ屋へ",
        notes: "決定ボタンを連打",
      },
      {
        type: "action",
        content: "サンドロの家へ",
      },
      {
        type: "coin",
        cid: 98,
      },
      {
        type: "action",
        content: "ケロリと話す",
      },
      {
        type: "move",
        content: "崖を登る",
        notes: "安定を取る場合はQ'sから入りなおす",
      },
      {
        type: "action",
        content: "サンドロの家へ",
        eid: 81,
      },
      {
        type: "action",
        content: "ピーチタウンへワープ",
      },
    ],
  },
  {
    id: 2,
    split: "アイランドブリッジ",
    todo: [
      {
        type: "equip",
        content: "ジェットタービン",
      },
      {
        type: "move",
        content: "南へ向かう",
      },
      {
        type: "pic",
        pid: 8,
      },
      {
        type: "coin",
        cid: 16,
      },
      {
        type: "pic",
        pid: 12,
      },
      {
        type: "coin",
        cid: 17,
      },
      {
        type: "coin",
        cid: 18,
      },
      {
        type: "pic",
        pid: 13,
      },
      {
        type: "pic",
        pid: 14,
      },
      {
        type: "move",
        content: "西の海岸へ向かう",
      },
      {
        type: "coin",
        cid: 20,
      },
      {
        type: "action",
        content: "トパーズを拾う",
      },
      {
        type: "coin",
        cid: 21,
      },
      {
        type: "pic",
        pid: 16,
      },
      {
        type: "pic",
        pid: 15,
      },
      {
        type: "coin",
        cid: 19,
      },
      {
        type: "move",
        content: "橋を渡る",
      },
      {
        type: "action",
        content: "Q'sファクトリーへ",
      },
    ],
  },
];

const generateTodoList = (data: Data[], id: number) =>
  data
    .filter((e) => e.id === id)
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
        return <li>err</li>;
      }
    });

export const App = () => {
  const [currentId, setCurrentId] = useState(1);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Input
            value={currentId}
            type="number"
            onChange={(event) => setCurrentId(parseInt(event.target.value, 10))}
          />
          <VStack spacing={2}>
            <Heading>{data.find((e) => e.id === currentId)?.split}</Heading>
            <ul>{generateTodoList(data, currentId)}</ul>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
