import db from '../../config/firebase';
import * as firebase from 'firebase';
import uuid from 'uuid';

export const getRoutes = () => {
    return async (dispatch, getState) => {
        const routes = await db
            .collection("routes")
            .get()

        let array = []
        routes.forEach(route => {
            array.push(route.data())
        });
        //console.log(array)

        dispatch({ type: "GET_ROUTES", payload: array })
    }
}
// export const getSpecificRoutes = () => {
//     return async (dispatch, getState) => {
//         const routes = await db
//             .collection("routes")
//             .doc()
//             .get()

//         let array = []
//         routes.forEach(route => {
//             array.push(route.data())
//         });
//         //console.log(array)

//         dispatch({ type: "GET_SPECIFIC_ROUTES", payload: array })
//     }
// }
export const newTicket = (uid, busID, arrival, departure, name, price) => {
    return async () => {
        try {
            const id = uuid.v4()
            //console.log(qrString)
            const upload = {
                id: id,
                uid: uid,
                busID: busID,
                //url: qrString,
                date: new Date().getTime(),
                arrival: arrival,
                departure: departure,
                name: name,
                price:price,
                status: 'active'
            }

            await db
                .collection('tickets')
                .doc(id)
                .set(upload)
            await db
                .collection('users')
                .doc(uid)
                .update({
                    tickets: firebase.firestore.FieldValue.arrayUnion(id)
                })
            alert('Successfully')
        } catch (e) {
            alert(e)
        }
    }
}
export const getBusInfo = (uid, busID) => {
    return async (dispatch) => {
        try {
            const routesQuery = await db.collection("routes").get()
            let bus = routesQuery.data()

            let tickets = []
            const ticketsQuery = await db.collection('tickets').where('uid', '==', uid).get()
            ticketsQuery.forEach(function (response) {
                tickets.push(response.data())
            })
            user.tickets = orderBy(tickets, 'date', 'desc')

            dispatch({ type: "GET_ROUTES", payload: array })
        } catch (e) {
            //console.log('getUser');
            //alert(e);
        }
    }
}
// export const getTickets = () => {
//     return async (dispatch, getState) => {
//         const tickQuery = await db
//             .collection("routes")
//             .get()

//         let array = []
//         routes.forEach(route => {
//             array.push(route.data())
//         });
//         //console.log(array)

//         dispatch({ type: "GET_TICKETS", payload: array })
//     }
// }