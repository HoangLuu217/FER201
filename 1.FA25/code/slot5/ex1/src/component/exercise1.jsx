function Exercise1() {
    //tinh ham double 
    const hamDouble = x => x * 2;
    //ham kiem tra so chan
    const isEven = x => x % 2 === 0;
    return (
        <div>
           <h1>Exercise 1</h1> 
           <p>Kết quả hamDouble(5): {hamDouble(5)}</p>
           <p>Kết quả isEven(4): {isEven(4).toString() ? "Số Chẳn" : "Số Lẻ"}</p>
        </div>
    );
}

export default Exercise1;