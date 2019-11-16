import React from 'react';
import { Datatable } from "@o2xp/react-datatable";
import {Link} from "react-router-dom";


const Table = ({data, columns, keyColumn, title, dtKey, prefix}) => {
    let options = {
        keyColumn: keyColumn,
        title: title,
        features: {
            canSearch: true,
            canOrderColumns: true,
        },
        font: 'Nunito',
        dimensions: {
            datatable: {
                height: '350px',
                width: '100%'
            }
        },
        data: {
            columns: [
                ...columns
            ],
            rows: [
                ...data
            ]
        }
    };

    const buildCustomTableBodyCell = ({ cellVal, column, rowId }) => {
        let val;
        switch (cellVal) {
            case "ordered":
                if (cellVal) {
                    val = <div style={{ color: "orange", textAlign: "left" }}>{cellVal.toUpperCase()}</div>;
                } else {
                    val = <div style={{ color: "red", textAlign: "left" }}>No</div>;
                }
                break;
            case "payed":
                if (cellVal) {
                    val = <div style={{ color: "green", textAlign: "left" }}>{cellVal.toUpperCase()}</div>;
                } else {
                    val = <div style={{ color: "red", textAlign: "left" }}>No</div>;
                }
                break;
            case "canceled":
                if (cellVal) {
                    val = <div style={{ color: "red", textAlign: "left" }}>{cellVal.toUpperCase()}</div>;
                } else {
                    val = <div style={{ color: "red", textAlign: "left" }}>No</div>;
                }
                break;
            default:
                val = <div style={{ color: "black" }}>{cellVal}</div>;
                break;
        }
        const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

        if (column.dataType === 'date'){
            val = <div style={{ color: "black", textAlign: "left" }}>{(new Date(cellVal)).toLocaleDateString('en-US', DATE_OPTIONS)}</div>;
        }

        if (column.dataType === 'text'){
            val =
                <div style={{ color: "black", textAlign: "left" }}>
                    <Link to={`/account/admin/${prefix}/${cellVal}`}>
                        {cellVal}
                    </Link>
                </div>
        }

        return val;
    };


    return (
        <div style={{marginTop: '25px'}}>
            {console.log(options)}
             <Datatable
                options={options}
                dtKey={dtKey}
                CustomTableBodyCell={buildCustomTableBodyCell}
            />
        </div>
    );
};

export default Table;
