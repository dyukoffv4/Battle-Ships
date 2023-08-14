let l_rooms = {};
let f_rooms = Array.from({length: 20}, (_, index) => index + 1);
let o_players = {};
let w_players = [];

function createRoom(p1_id, p2_id) {
    return {
        type: "Room",
        p1: {
            id: p1_id,
            data: [],
            name: "",   // Todo: BD load add
            score: 0    // ***
        },
        p2: {
            id: p2_id,
            data: [],
            name: "",   // Todo: BD load add
            score: 0    // ***
        }
    }
}

function playerConnect(p_id) {
    if (f_rooms.length === 0) {
        w_players.push(p_id);
        return;
    }

    if (w_players.length !== 0) {
        let r_id = f_rooms.splice(0, 1)[0];
        l_rooms[r_id] = createRoom(w_players.splice(0, 1)[0], p_id);

        players[p_id] = players[waiting] = rooms.length - 1;
        waiting = null;
    }
    else waiting = p_id;
}

function playerDisconnect(p_id) {
    let an_id = rooms[players[p_id]].p1.id;
    if (an_id === p_id) an_id = rooms[players[p_id]].p2.id;

    if (waiting === p_id) {
        p_id = null;
    }

    waiting = p_id;
}

module.exports.rooms = l_rooms;
module.exports.createRoom = createRoom;
module.exports.waiting = waiting;
module.exports.players = players;
