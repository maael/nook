import { FaTree, FaMoneyBillWave, FaRecycle, FaTimes } from "react-icons/fa";
import {
  GiRock,
  GiShinyApple,
  GiFruitTree,
  GiFossil,
  GiSquareBottle,
  GiTalk,
  GiPerson,
  GiSwapBag,
  GiSofa
} from "react-icons/gi";
import MoneyTreeTracker from "../components/compositions/MoneyTreeTracker";
import CheckboxPill from "../components/primitives/CheckboxPill";
import Heading from "../components/primitives/Heading";
import useLocalstorage, {
  LocalStorageKeys
} from "../components/hooks/useLocalstorage";
import { colors } from "../util/theme";

const styles = {
  pill: {
    display: "inline-block"
  }
};

const INITIAL_CHECKLIST = {
  moneyTree: false,
  moneyRock: false,
  harvestFruit: false,
  sellFruit: false,
  turnipPrices: false,
  nookStop: false,
  fossils: false,
  messageInABotttle: false,
  talkToVillagers: false,
  recyclingBin: false,
  islandVisitors: false,
  treeFurniture: false
};

export default function Daily() {
  const [checklist, setChecklist] = useLocalstorage(
    LocalStorageKeys.DAILY_CHECKLIST,
    INITIAL_CHECKLIST
  );
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10
      }}
    >
      <Heading>Daily Checklist</Heading>
      <div>
        <div
          css={{
            outline: "none",
            userSelect: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.blueDark,
            color: colors.blueLight,
            margin: "2px 10px 10px",
            padding: 5,
            borderRadius: "0.3em",
            cursor: "pointer"
          }}
          onClick={() => setChecklist(INITIAL_CHECKLIST)}
        >
          Reset <FaTimes style={{ marginLeft: 5 }} />
        </div>
      </div>
      <div>
        <div css={styles.pill}>
          <CheckboxPill
            label={"Money Tree"}
            checked={checklist.moneyTree}
            onChange={() =>
              setChecklist(c => ({ ...c, moneyTree: !c.moneyTree }))
            }
            icon={<FaTree color={colors.green} />}
          />
        </div>
      </div>
      <div>
        <div css={styles.pill}>
          <CheckboxPill
            label={"Money rock"}
            checked={checklist.moneyRock}
            onChange={() =>
              setChecklist(c => ({ ...c, moneyRock: !c.moneyRock }))
            }
            icon={<GiRock color={colors.rockGrey} />}
          />
        </div>
      </div>
      <div>
        <div css={styles.pill}>
          <CheckboxPill
            label={"Harvest Fruit"}
            checked={checklist.harvestFruit}
            onChange={() =>
              setChecklist(c => ({ ...c, harvestFruit: !c.harvestFruit }))
            }
            icon={<GiFruitTree color={colors.green} />}
          />
        </div>
      </div>
      <div>
        <div css={styles.pill}>
          <CheckboxPill
            label={"Sell Fruit"}
            checked={checklist.sellFruit}
            onChange={() =>
              setChecklist(c => ({ ...c, sellFruit: !c.sellFruit }))
            }
            icon={<GiShinyApple color={colors.redDark} />}
          />
        </div>
      </div>
      <div>
        <div css={styles.pill}>
          <CheckboxPill
            label={"Check Turnip prices"}
            checked={checklist.turnipPrices}
            onChange={() =>
              setChecklist(c => ({ ...c, turnipPrices: !c.turnipPrices }))
            }
            icon={<GiSwapBag color={colors.bagBrown} />}
          />
        </div>
      </div>
      <div>
        <div css={styles.pill}>
          <CheckboxPill
            label={"Nook Stop Terminal"}
            checked={checklist.nookStop}
            onChange={() =>
              setChecklist(c => ({ ...c, nookStop: !c.nookStop }))
            }
            icon={<FaMoneyBillWave color={colors.green} />}
          />
        </div>
      </div>
      <div>
        <div css={styles.pill}>
          <CheckboxPill
            label={"Collect fossils"}
            checked={checklist.fossils}
            onChange={() => setChecklist(c => ({ ...c, fossils: !c.fossils }))}
            icon={<GiFossil color={colors.bagBrown} />}
          />
        </div>
      </div>
      <div>
        <div css={styles.pill}>
          <CheckboxPill
            label={"Message in a bottle"}
            checked={checklist.messageInABotttle}
            onChange={() =>
              setChecklist(c => ({
                ...c,
                messageInABotttle: !c.messageInABotttle
              }))
            }
            icon={<GiSquareBottle color={colors.rockGrey} />}
          />
        </div>
      </div>
      <div>
        <div css={styles.pill}>
          <CheckboxPill
            label={"Talk to Villagers"}
            checked={checklist.talkToVillagers}
            onChange={() =>
              setChecklist(c => ({
                ...c,
                talkToVillagers: !c.talkToVillagers
              }))
            }
            icon={<GiTalk color={colors.rockGrey} />}
          />
        </div>
      </div>
      <div>
        <div css={styles.pill}>
          <CheckboxPill
            label={"Check Recycling Bin"}
            checked={checklist.recyclingBin}
            onChange={() =>
              setChecklist(c => ({ ...c, recyclingBin: !c.recyclingBin }))
            }
            icon={<FaRecycle color={colors.green} />}
          />
        </div>
      </div>
      <div>
        <div css={styles.pill}>
          <CheckboxPill
            label={"Check for Island Visitors"}
            checked={checklist.islandVisitors}
            onChange={() =>
              setChecklist(c => ({ ...c, islandVisitors: !c.islandVisitors }))
            }
            icon={<GiPerson />}
          />
        </div>
      </div>
      <div>
        <div css={styles.pill}>
          <CheckboxPill
            label={"Shake trees for furniture"}
            checked={checklist.treeFurniture}
            onChange={() =>
              setChecklist(c => ({ ...c, treeFurniture: !c.treeFurniture }))
            }
            icon={<GiSofa />}
          />
        </div>
      </div>
      <MoneyTreeTracker />
    </div>
  );
}
