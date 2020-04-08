/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import { AutoSizer, Grid, WindowScroller } from "react-virtualized";
import NewCustomDesign from "../components/compositions/NewCustomDesign";
import CustomDesignItem, {
  HEIGHT,
  WIDTH,
  PADDING
} from "../components/primitives/CustomDesignItem";
import useCustomDesigns from "../components/hooks/useCustomDesigns";

export default function Collections() {
  const [customDesigns, setCustomDesigns] = useCustomDesigns();
  return (
    <>
      <div
        css={{
          margin: "0px auto",
          textAlign: "center",
          padding: 10,
          maxWidth: 1000
        }}
      >
        <NewCustomDesign
          onCreate={created => setCustomDesigns(c => [...c, created])}
        />
      </div>
      <WindowScroller scrollElement={window}>
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <Grid
                cellRenderer={({ columnIndex, key, rowIndex, style }) => {
                  const customDesign =
                    customDesigns[columnIndex + rowIndex * 2];
                  return (
                    <div
                      key={key}
                      ref={registerChild}
                      style={{
                        ...style,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {customDesign ? (
                        <CustomDesignItem customDesign={customDesign} />
                      ) : null}
                    </div>
                  );
                }}
                style={{ overflowX: "hidden" }}
                autoHeight
                columnCount={Math.floor(width / (WIDTH + PADDING))}
                columnWidth={Math.ceil(
                  width / Math.floor(width / (WIDTH + PADDING))
                )}
                height={height}
                rowCount={Math.ceil(
                  customDesigns.length / Math.floor(width / (WIDTH + PADDING))
                )}
                rowHeight={HEIGHT + PADDING}
                width={width}
                scrollTop={scrollTop}
                isScrolling={isScrolling}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </>
  );
}
