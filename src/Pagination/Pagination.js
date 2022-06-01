import React, { useEffect, useState } from "react";

function Pagination() {
  const styles = {
    data: { marginRight: "25px" },
    pgBtn: { margin: "15px", padding: "5px", backgroundColor: "grey" },
  };

  const sampleData = [
    { name: "abc", age: "24", sex: "male" },
    { name: "xyz", age: "25", sex: "female" },
    { name: "ert", age: "22", sex: "male" },
    { name: "ghj", age: "28", sex: "male" },
    { name: "asd", age: "23", sex: "female" },
    { name: "rty", age: "25", sex: "female" },
    { name: "bnm", age: "22", sex: "female" },
    { name: "sdf", age: "24", sex: "male" },
    { name: "zxc", age: "21", sex: "male" },
    { name: "iop", age: "23", sex: "female" },
    { name: "abc", age: "24", sex: "male" },
    { name: "xyz", age: "25", sex: "female" },
    { name: "ert", age: "22", sex: "male" },
    { name: "ghj", age: "28", sex: "male" },
    { name: "asd", age: "23", sex: "female" },
    { name: "rty", age: "25", sex: "female" },
    { name: "bnm", age: "22", sex: "female" },
    { name: "sdf", age: "24", sex: "male" },
    { name: "zxc", age: "21", sex: "male" },
    { name: "iop", age: "23", sex: "female" },
  ];

  const [dataToShow, setDataToShow] = useState(sampleData);
  const [pageNos, setPageNos] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setDataView(sampleData);
    if (localStorage.getItem("pgno") !== null) {
      const pgno = localStorage.getItem("pgno");
      setCurrentPage(pgno);
    }
  }, []);

  function setDataView(data) {
    const limit = data.length / 4;
    console.log("limit", limit);
    let pageLimits = [];
    let pages = [];
    let temp = 0;

    localStorage.setItem("pgno", 1)

    for (let i = 0; i < limit; i++) {
      pageLimits.push({ upperLimit: temp, lowerLimit: temp + 4 });
      pages.push(i);
      temp = temp + 4;
    }

    setPageNumbers([...pages]);
    setDataToShow(data);
    setPageNos([...pageLimits]);
  }

  function pageView(pg) {
    console.log("limits", pageNos);

    if (pageNos.length > 0) {
      const ul = pageNos[pg - 1].upperLimit;
      const ll = pageNos[pg - 1].lowerLimit;

      return (
        <div>
          {dataToShow.slice(ul, ll).map((data, index) => {
            return (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <p style={styles.data}>{index + ul}</p>
                <p style={styles.data}>{data.name}</p>
                <p style={styles.data}>{data.age}</p>
                <p style={styles.data}>{data.sex}</p>
              </div>
            );
          })}
        </div>
      );
    }
  }

  function handleGenderFilter(gender) {
    setCurrentPage(1);

    const tempData = sampleData.filter((data) => data.sex === gender);
    console.log("tempData", tempData);

    localStorage.clear();

    // const res =
    //   gender.length > 0
    //     ? (setDataToShow(sampleData), setDataView(sampleData))
    //     : (setDataToShow(tempData), setDataView(tempData));

    setDataToShow(tempData);
    setDataView(tempData);
  }

  return (
    <div>
      {pageView(currentPage)}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p> </p>
        {pageNumbers.map((no) => {
          return (
            <div
              style={styles.pgBtn}
              onClick={() => (
                setCurrentPage(no + 1), localStorage.setItem("pgno", no + 1)
              )}
            >
              {no + 1}
            </div>
          );
        })}
      </div>
      <div>
        <p style={{ marginBottom: "0px" }}>Filter:</p>
        <select
          name="gender"
          id="gender"
          onChange={(e) => handleGenderFilter(e.target.value)}
        >
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <button onClick={() => setDataView(sampleData)}>Reset</button>
      </div>
      <p style={{ maxWidth: "420px" }}>
        Refresh page to check persistant page numbers. Persistant page numbers
        are reset when filter is applied
      </p>
      <div>
        <h4 style={{ marginTop: "50px", marginBottom: "10px" }}>All Data</h4>
        <div>
          {dataToShow.map((data, index) => {
            return (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <p style={styles.data}>{index}</p>
                <p style={styles.data}>{data.name}</p>
                <p style={styles.data}>{data.age}</p>
                <p style={styles.data}>{data.sex}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Pagination;
