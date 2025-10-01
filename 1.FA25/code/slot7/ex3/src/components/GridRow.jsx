import GridCell from './GridCell';

export default function GridRow() {
  return (
    <>
      {/* Row 1: 2 columns - 8/4 split */}
      <div className="row mb-3">
        <GridCell colSize={8} content="First col" />
        <GridCell colSize={4} content="Second col" />
      </div>
      
      {/* Row 2: 3 equal columns */}
      <div className="row mb-3">
        <GridCell colSize={4} content="col" />
        <GridCell colSize={4} content="col" />
        <GridCell colSize={4} content="col" />
      </div>
      
      {/* Row 3: 4 equal columns */}
      <div className="row mb-3">
        <GridCell colSize={3} content="col" />
        <GridCell colSize={3} content="col" />
        <GridCell colSize={3} content="col" />
        <GridCell colSize={3} content="col" />
      </div>
    </>
  );
}
