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
export const newTicket = (uid, busID, qrString, arrival, departure, name) => {
    return async (dispatch, getState) => {
        try {
            const id = uuid.v4()
            const upload = {
                id: id,
                uid: uid,
                busID: busID,
                url: qrString,
                date: new Date().getTime(),
                arrival:arrival,
                departure:departure,
                name:name,
                status:'enable'
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