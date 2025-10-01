export default function GridCell({ colSize, content }) {
  return (
    <div className={`col-${colSize}`}>
      <div className="p-3 bg-light border rounded">
        {content}
      </div>
    </div>
  );
}
