import DataList from "../model/DataList";
import { getDataFromServer } from "../service/apiService";
import { useState, useEffect } from "react";
import Form from "./Form";
import React from "react";

function ShowData() {

    const [items, setItems] = useState<DataList[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [sum, setSum] = useState<number | null>()
    const [rohinaspent, setRohinaspent] = useState<number>(0)
    const [mayurispent, setMayurispent] = useState<number>(0)

    let rohinaspent1 = 0;
    let mayurispent1 = 0;



    useEffect(
        () => {

            const getData = async () => {
                const data = await getDataFromServer();
                setItems(data);
                setSum(data.reduce((result, v) => result = result + v.price, 0))
                Shares(data);
            }
            getData();
        },

        [showForm]
    );

    const Shares = (data: DataList[]) => {

        data.map(
            sams => (
                sams.payeeName === "Rohina" ? (
                    rohinaspent1 = rohinaspent1 + sams.price
                ) :
                    (
                        mayurispent1 = mayurispent1 + sams.price
                    )
            )
        )
        setRohinaspent(rohinaspent1)
        setMayurispent(mayurispent1)
    }

    const success = () => {
        setShowForm(false)
    }
    const cancel = () => {
        setShowForm(false)
    }

    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
            {
                showForm && (
                    <div className="form">
                        <Form onTrue={success} onClose={cancel} />
                    </div>
                )
            }
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{ width: 112 }}>Payee</div>
            </>

            {
                items && (
                    items.map(
                        (user, idx) => {
                            return (
                                <div key={idx}>
                                    <div className="use-inline date">{user.setDate}</div>
                                    <div className="use-inline">{user.product}</div>
                                    <div className="use-inline price">{user.price}</div>
                                    <div className="use-inline" style={{ width: 112 }}>{user.payeeName}</div>
                                </div>
                            )
                        }
                    )
                )
            }
            <hr></hr>
            <div className="use-inline">Total: </div>
            <span className="use-inline total">{sum}</span> <br />
            <div className="use-inline ">Rohina paid: </div>
            <span className="use-inline total Rohina">{rohinaspent}</span> <br />
            <div className="use-inline ">Mayuri paid: </div>
            <span className="use-inline total Mayuri">{mayurispent}</span> <br />
            <span className="use-inline payable">{rohinaspent > mayurispent ? "Pay Rohina " : "Pay Mayuri"}</span>
            <span className="use-inline payable price"> {Math.abs((rohinaspent - mayurispent) / 2)}</span>
        </>

    )
}

export default ShowData;
