/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useMemo } from "react";
import { AutoSizer, Grid, WindowScroller } from "react-virtualized";
import CustomDesignItem, {
  HEIGHT,
  WIDTH,
  PADDING
} from "../primitives/CustomDesignItem";

export default function Collections({
  customDesigns,
  savedCustomDesigns,
  onDelete,
  onSaveToggle
}: {
  customDesigns: any[];
  savedCustomDesigns: any[];
  onDelete: (deleted: any) => void;
  onSaveToggle: (savedId: string, saved: boolean) => void;
}) {
  const savedIds = useMemo(
    () => savedCustomDesigns.map(({ customDesign }) => customDesign._id),
    [savedCustomDesigns]
  );
  return (
    <WindowScroller scrollElement={window}>
      {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => {
            const columnCount = Math.min(
              customDesigns.length || 1,
              Math.floor(width / (WIDTH + PADDING)) || 1
            );
            return (
              <Grid
                cellRenderer={({ columnIndex, key, rowIndex, style }) => {
                  const customDesign =
                    customDesigns[columnIndex + rowIndex * columnCount];
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
                        <CustomDesignItem
                          customDesign={customDesign}
                          onDelete={() => onDelete(customDesign)}
                          onSaveToggle={onSaveToggle}
                          saved={savedIds.includes(customDesign._id)}
                        />
                      ) : null}
                    </div>
                  );
                }}
                style={{ overflowX: "hidden", outline: "none" }}
                autoHeight
                onScroll={onChildScroll}
                columnCount={columnCount}
                columnWidth={Math.ceil(width / columnCount)}
                height={height}
                rowCount={Math.ceil(customDesigns.length / columnCount)}
                rowHeight={HEIGHT + PADDING}
                width={width}
                scrollTop={scrollTop}
                isScrolling={isScrolling}
              />
            );
          }}
        </AutoSizer>
      )}
    </WindowScroller>
  );
}
