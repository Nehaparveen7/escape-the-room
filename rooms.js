import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


// =====================================================
// MATERIALS
// =====================================================

const floorMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x3a3a3a
    });

const wallMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x242424
    });

const deskMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x6b4226,
        roughness: 0.7
    });

const darkMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x111111
    });


// =====================================================
// BASIC OBJECTS
// =====================================================

function box(
    width,
    height,
    depth,
    material
) {

    return new THREE.Mesh(
        new THREE.BoxGeometry(
            width,
            height,
            depth
        ),
        material
    );

}


function cylinder(
    radius,
    height,
    material
) {

    return new THREE.Mesh(
        new THREE.CylinderGeometry(
            radius,
            radius,
            height,
            32
        ),
        material
    );

}


// =====================================================
// LABEL
// =====================================================

function label(
    group,
    text,
    x,
    y,
    z,
    color = "#ffffff"
) {

    const canvas =
        document.createElement(
            "canvas"
        );

    canvas.width = 512;
    canvas.height = 128;

    const ctx =
        canvas.getContext("2d");

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle =
        color;

    ctx.font =
        "bold 42px Arial";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.fillText(
        text,
        canvas.width / 2,
        canvas.height / 2
    );

    const texture =
        new THREE.CanvasTexture(
            canvas
        );

    const sprite =
        new THREE.Sprite(
            new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                depthWrite: false
            })
        );

    sprite.position.set(
        x,
        y,
        z
    );

    sprite.scale.set(
        2.4,
        0.6,
        1
    );

    group.add(
        sprite
    );

    return sprite;
}


// =====================================================
// FLOOR
// =====================================================

function createFloor(
    group
) {

    const floor =
        box(
            10,
            0.2,
            18,
            floorMaterial
        );

    floor.position.set(
        0,
        -0.1,
        0
    );

    group.add(
        floor
    );

}


// =====================================================
// WALLS
// =====================================================

function createWalls(
    group
) {

    const backWall =
        box(
            10,
            5,
            0.2,
            wallMaterial
        );

    backWall.position.set(
        0,
        2.5,
        -9
    );

    group.add(
        backWall
    );


    const leftWall =
        box(
            0.2,
            5,
            18,
            wallMaterial
        );

    leftWall.position.set(
        -5,
        2.5,
        0
    );

    group.add(
        leftWall
    );


    const rightWall =
        box(
            0.2,
            5,
            18,
            wallMaterial
        );

    rightWall.position.set(
        5,
        2.5,
        0
    );

    group.add(
        rightWall
    );


    // FRONT WALL WITH DOOR OPENING

    const frontLeft =
        box(
            3.2,
            5,
            0.2,
            wallMaterial
        );

    frontLeft.position.set(
        -3.4,
        2.5,
        9
    );

    group.add(
        frontLeft
    );


    const frontRight =
        box(
            3.2,
            5,
            0.2,
            wallMaterial
        );

    frontRight.position.set(
        3.4,
        2.5,
        9
    );

    group.add(
        frontRight
    );


    const frontTop =
        box(
            3.6,
            2,
            0.2,
            wallMaterial
        );

    frontTop.position.set(
        0,
        4,
        9
    );

    group.add(
        frontTop
    );

}


// =====================================================
// LIGHT
// =====================================================

function createLight(
    group
) {

    const lamp =
        new THREE.PointLight(
            0xffffff,
            30,
            18
        );

    lamp.position.set(
        0,
        4.5,
        0
    );

    lamp.castShadow =
        true;

    group.add(
        lamp
    );

}


// =====================================================
// STUDY ROOM
// =====================================================

function createStudyDesk(
    group
) {

    // DESK

    const deskTop =
        box(
            7,
            0.35,
            3.2,
            deskMaterial
        );

    // Moved farther away from starting point

    deskTop.position.set(
        0,
        1.1,
        0.5
    );

    group.add(
        deskTop
    );


    // DESK LEGS

    const legPositions = [
        [-3, 0, -0.6],
        [3, 0, -0.6],
        [-3, 0, 1.6],
        [3, 0, 1.6]
    ];


    for (
        const position
        of legPositions
    ) {

        const leg =
            box(
                0.3,
                1.1,
                0.3,
                deskMaterial
            );

        leg.position.set(
            position[0],
            0.55,
            position[2]
        );

        group.add(
            leg
        );

    }


    // LAPTOP BASE

    const laptopBase =
        box(
            2.4,
            0.15,
            1.7,
            darkMaterial
        );

    laptopBase.position.set(
        -0.8,
        1.35,
        0.4
    );

    laptopBase.userData.type =
        "laptop";

    group.add(
        laptopBase
    );


    // LAPTOP BACK

    const laptopScreen =
        box(
            2.3,
            1.5,
            0.12,
            darkMaterial
        );

    laptopScreen.position.set(
        -0.8,
        2.1,
        -0.35
    );

    laptopScreen.rotation.x =
        -0.12;

    laptopScreen.userData.type =
        "laptopScreen";

    group.add(
        laptopScreen
    );


    // SCREEN

    const screenMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x07121c,
            emissive: 0x062030,
            emissiveIntensity: 0.7
        });

    const screen =
        box(
            2,
            1.2,
            0.03,
            screenMaterial
        );

    screen.position.set(
        -0.8,
        2.1,
        -0.43
    );

    screen.rotation.x =
        -0.12;

    screen.userData.type =
        "laptopScreen";

    group.add(
        screen
    );


    label(
        group,
        "LAPTOP",
        -0.8,
        3.05,
        -0.4
    );


    // PAPER

    const paperMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xf5e8c8
        });

    const paper =
        box(
            1.3,
            0.035,
            1.0,
            paperMaterial
        );

    paper.position.set(
        1.8,
        1.32,
        0.5
    );

    paper.rotation.y =
        -0.12;

    paper.userData.type =
        "paper";

    group.add(
        paper
    );


    label(
        group,
        "PAPER",
        1.8,
        2.05,
        0.5,
        "#ffe9b0"
    );


    // USB

    const usbMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xeeeeee,
            metalness: 0.8,
            roughness: 0.25,
            emissive: 0x244455,
            emissiveIntensity: 0.7
        });

    const usb =
        box(
            0.75,
            0.25,
            0.32,
            usbMaterial
        );

    usb.position.set(
        2.7,
        1.48,
        0.5
    );

    usb.rotation.y =
        -0.25;

    usb.userData.type =
        "usb";

    group.add(
        usb
    );


    // USB CONNECTOR

    const connectorMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xc0c0c0,
            metalness: 1,
            roughness: 0.15
        });

    const connector =
        box(
            0.28,
            0.17,
            0.24,
            connectorMaterial
        );

    connector.position.set(
        0.42,
        0,
        0
    );

    usb.add(
        connector
    );


    const glow =
        new THREE.PointLight(
            0x33bbff,
            3,
            2
        );

    glow.position.set(
        2.7,
        1.7,
        0.5
    );

    group.add(
        glow
    );


    label(
        group,
        "USB DRIVE",
        2.7,
        2.05,
        0.5,
        "#66ddff"
    );


    // LAMP

    const lampBase =
        cylinder(
            0.35,
            0.12,
            darkMaterial
        );

    lampBase.position.set(
        3.5,
        1.35,
        1.3
    );

    group.add(
        lampBase
    );


    const lampPole =
        cylinder(
            0.06,
            1.3,
            darkMaterial
        );

    lampPole.position.set(
        3.5,
        2.0,
        1.3
    );

    group.add(
        lampPole
    );


    const lampLight =
        new THREE.PointLight(
            0xffcc88,
            15,
            6
        );

    lampLight.position.set(
        3.5,
        2.7,
        1.1
    );

    group.add(
        lampLight
    );


    // BOOK

    const book =
        box(
            1.5,
            0.25,
            0.9,
            new THREE.MeshStandardMaterial({
                color: 0x27384f
            })
        );

    book.position.set(
        -3.0,
        1.4,
        0.7
    );

    group.add(
        book
    );


    // PEN HOLDER

    const penHolder =
        cylinder(
            0.22,
            0.55,
            darkMaterial
        );

    penHolder.position.set(
        -3.5,
        1.55,
        1.4
    );

    group.add(
        penHolder
    );


    // PENS

    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const pen =
            cylinder(
                0.025,
                0.7,
                new THREE.MeshStandardMaterial({
                    color: 0xdddddd
                })
            );

        pen.position.set(
            -3.5 + i * 0.08,
            1.95,
            1.4
        );

        pen.rotation.z =
            (i - 1) * 0.15;

        group.add(
            pen
        );

    }


    // CHAIR

    const chairSeat =
        box(
            2.2,
            0.25,
            2,
            darkMaterial
        );

    chairSeat.position.set(
        0,
        0.9,
        3
    );

    group.add(
        chairSeat
    );


    const chairBack =
        box(
            2.2,
            2,
            0.25,
            darkMaterial
        );

    chairBack.position.set(
        0,
        1.8,
        3.9
    );

    group.add(
        chairBack
    );

}


// =====================================================
// DOOR
// =====================================================

function createDoor(
    group
) {

    const door =
        box(
            2.8,
            4,
            0.3,
            new THREE.MeshStandardMaterial({
                color: 0x111827
            })
        );

    door.position.set(
        0,
        2,
        -8.8
    );

    door.userData.type =
        "door";

    group.add(
        door
    );


    label(
        group,
        "DIGITAL LOCK",
        0,
        4.6,
        -8.5,
        "#ffcc55"
    );


    const lock =
        box(
            0.7,
            1,
            0.15,
            new THREE.MeshStandardMaterial({
                color: 0x151515,
                emissive: 0x222222
            })
        );

    lock.position.set(
        1.0,
        2,
        -8.6
    );

    group.add(
        lock
    );

}


// =====================================================
// LABORATORY
// =====================================================

function createLab(
    group
) {

    // LAB TABLE

    const table =
        box(
            6,
            0.3,
            2.5,
            deskMaterial
        );

    table.position.set(
        0,
        1.1,
        1
    );

    group.add(
        table
    );


    // =================================================
    // MICROSCOPE = 7
    // =================================================

    const microscopeBase =
        box(
            0.8,
            0.18,
            0.6,
            darkMaterial
        );

    microscopeBase.position.set(
        -2,
        1.35,
        1
    );

    microscopeBase.userData.type =
        "labObject";

    microscopeBase.userData.number =
        7;

    microscopeBase.userData.name =
        "Microscope";

    group.add(
        microscopeBase
    );


    const microscopeTube =
        cylinder(
            0.12,
            0.8,
            darkMaterial
        );

    microscopeTube.position.set(
        -2,
        1.8,
        1
    );

    microscopeTube.userData.type =
        "labObject";

    microscopeTube.userData.number =
        7;

    group.add(
        microscopeTube
    );


    label(
        group,
        "MICROSCOPE",
        -2,
        2.5,
        1,
        "#ffdd88"
    );


    // =================================================
    // TEST TUBE = 3
    // =================================================

    const testTube =
        cylinder(
            0.18,
            0.8,
            new THREE.MeshStandardMaterial({
                color: 0x3366ff,
                emissive: 0x112244
            })
        );

    testTube.position.set(
        0,
        1.7,
        1
    );

    testTube.userData.type =
        "labObject";

    testTube.userData.number =
        3;

    testTube.userData.name =
        "Test Tube";

    group.add(
        testTube
    );


    label(
        group,
        "TEST TUBE",
        0,
        2.5,
        1,
        "#66ccff"
    );


    // =================================================
    // COMPUTER NOTE = 9
    // =================================================

    const note =
        box(
            1.2,
            0.04,
            0.8,
            new THREE.MeshStandardMaterial({
                color: 0xf5e8c8
            })
        );

    note.position.set(
        2,
        1.3,
        1
    );

    note.userData.type =
        "labObject";

    note.userData.number =
        9;

    note.userData.name =
        "Computer Note";

    group.add(
        note
    );


    label(
        group,
        "COMPUTER NOTE",
        2,
        2.05,
        1,
        "#ffe9b0"
    );


    // =================================================
    // LAB CLUE
    // =================================================

    const clue =
        box(
            1.5,
            0.04,
            1,
            new THREE.MeshStandardMaterial({
                color: 0xf5e8c8
            })
        );

    clue.position.set(
        -2.8,
        1.3,
        -1.5
    );

    clue.userData.type =
        "labClue";

    group.add(
        clue
    );


    label(
        group,
        "LAB CLUE",
        -2.8,
        2.05,
        -1.5,
        "#ffdd88"
    );


    // =================================================
    // LAB TERMINAL
    // =================================================

    const computer =
        box(
            1.8,
            1.2,
            0.15,
            darkMaterial
        );

    computer.position.set(
        0,
        2,
        -2
    );

    computer.userData.type =
        "labTerminal";

    group.add(
        computer
    );


    label(
        group,
        "LAB TERMINAL",
        0,
        3.1,
        -2,
        "#66ffff"
    );


    createDoor(
        group
    );

}


// =====================================================
// SECURITY ROOM
// =====================================================

function createSecurity(
    group
) {

    const desk =
        box(
            6,
            0.3,
            2,
            deskMaterial
        );

    desk.position.set(
        0,
        1.1,
        1
    );

    group.add(
        desk
    );


    // =================================================
    // CAMERAS
    // =================================================

    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const monitor =
            box(
                1.2,
                1,
                0.15,
                new THREE.MeshStandardMaterial({
                    color: 0x101010,
                    emissive: 0x092030
                })
            );

        monitor.position.set(
            -2.1 + i * 1.4,
            2,
            0.5
        );

        monitor.userData.type =
            "monitor";

        monitor.userData.cameraNumber =
            i + 1;

        group.add(
            monitor
        );


        label(
            group,
            `CAM ${i + 1}`,
            -2.1 + i * 1.4,
            2.8,
            0.5,
            "#66ddff"
        );

    }


    // =================================================
    // SECURITY LOG
    // =================================================

    const clue =
        box(
            1.4,
            0.04,
            0.9,
            new THREE.MeshStandardMaterial({
                color: 0xf5e8c8
            })
        );

    clue.position.set(
        -2,
        1.3,
        1.2
    );

    clue.userData.type =
        "securityClue";

    group.add(
        clue
    );


    label(
        group,
        "SECURITY LOG",
        -2,
        2.05,
        1.2,
        "#ffdd88"
    );


    // =================================================
    // SECURITY TERMINAL
    // =================================================

    const computer =
        box(
            1.8,
            1.2,
            0.15,
            darkMaterial
        );

    computer.position.set(
        0,
        2,
        -2.5
    );

    computer.userData.type =
        "securityComputer";

    group.add(
        computer
    );


    label(
        group,
        "SECURITY TERMINAL",
        0,
        3.1,
        -2.5,
        "#66ffff"
    );


    createDoor(
        group
    );

}


// =====================================================
// FINAL ROOM
// =====================================================

function createFinalRoom(
    group
) {

    // FINAL TERMINAL

    const terminal =
        box(
            2,
            1.4,
            0.2,
            new THREE.MeshStandardMaterial({
                color: 0x111111,
                emissive: 0x092c35
            })
        );

    terminal.position.set(
        0,
        2,
        -3
    );

    terminal.userData.type =
        "finalTerminal";

    group.add(
        terminal
    );


    label(
        group,
        "FINAL TERMINAL",
        0,
        3.2,
        -3,
        "#66ffff"
    );


    // EXIT

    const exit =
        box(
            3,
            4,
            0.3,
            new THREE.MeshStandardMaterial({
                color: 0x164e2a,
                emissive: 0x0b3319
            })
        );

    exit.position.set(
        0,
        2,
        -8.8
    );

    exit.userData.type =
        "door";

    group.add(
        exit
    );


    label(
        group,
        "FINAL EXIT",
        0,
        4.6,
        -8.5,
        "#66ff99"
    );

}


// =====================================================
// CREATE ROOM
// =====================================================

export function createRoom(
    roomNumber
) {

    const group =
        new THREE.Group();


    createFloor(
        group
    );

    createWalls(
        group
    );

    createLight(
        group
    );


    if (
        roomNumber === 0
    ) {

        createStudyDesk(
            group
        );

        createDoor(
            group
        );

    }


    if (
        roomNumber === 1
    ) {

        createLab(
            group
        );

    }


    if (
        roomNumber === 2
    ) {

        createSecurity(
            group
        );

    }


    if (
        roomNumber === 3
    ) {

        createFinalRoom(
            group
        );

    }


    return group;
}