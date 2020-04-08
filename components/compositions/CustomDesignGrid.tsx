/** @jsx jsx */
import { jsx } from "@emotion/core";
import { AutoSizer, Grid, WindowScroller } from "react-virtualized";
import CustomDesignItem, {
  HEIGHT,
  WIDTH,
  PADDING
} from "../primitives/CustomDesignItem";

export default function Collections({
  customDesigns
}: {
  customDesigns: any[];
}) {
  return (
    <WindowScroller scrollElement={window}>
      {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <Grid
              cellRenderer={({ columnIndex, key, rowIndex, style }) => {
                const customDesign = customDesigns[columnIndex + rowIndex * 2];
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
              onScroll={onChildScroll}
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
  );
}
