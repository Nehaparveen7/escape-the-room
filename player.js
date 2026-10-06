const keys = {};

let joystickX = 0;
let joystickY = 0;

let yaw = 0;
let pitch = 0;

const speed = 0.08;


/* =====================================================
   KEYBOARD
===================================================== */

window.addEventListener(
    "keydown",
    event => {

        keys[
            event.key.toLowerCase()
        ] = true;

    }
);


window.addEventListener(
    "keyup",
    event => {

        keys[
            event.key.toLowerCase()
        ] = false;

    }
);


/* =====================================================
   JOYSTICK
===================================================== */

export function setupJoystick() {

    const joystick =
        document.getElementById(
            "joystick"
        );

    const knob =
        document.getElementById(
            "joystickKnob"
        );

    if (!joystick || !knob) {
        return;
    }


    function resetJoystick() {

        joystickX = 0;
        joystickY = 0;

        knob.style.transform =
            "translate(0,0)";

    }


    joystick.addEventListener(
        "touchmove",
        event => {

            event.preventDefault();
            event.stopPropagation();

            const touch =
                event.touches[0];

            if (!touch) {
                return;
            }


            const rect =
                joystick.getBoundingClientRect();


            const centerX =
                rect.left +
                rect.width / 2;


            const centerY =
                rect.top +
                rect.height / 2;


            joystickX =
                (
                    touch.clientX -
                    centerX
                ) / 45;


            joystickY =
                (
                    touch.clientY -
                    centerY
                ) / 45;


            joystickX =
                Math.max(
                    -1,
                    Math.min(
                        1,
                        joystickX
                    )
                );


            joystickY =
                Math.max(
                    -1,
                    Math.min(
                        1,
                        joystickY
                    )
                );


            knob.style.transform =
                `translate(
                    ${joystickX * 30}px,
                    ${joystickY * 30}px
                )`;

        },
        {
            passive: false
        }
    );


    joystick.addEventListener(
        "touchend",
        resetJoystick
    );


    joystick.addEventListener(
        "touchcancel",
        resetJoystick
    );

}


/* =====================================================
   PC MOUSE LOOK
===================================================== */

export function setupMouseLook(
    camera,
    renderer
) {

    renderer.domElement.addEventListener(
        "click",
        () => {

            if (
                window.innerWidth > 768
            ) {

                renderer.domElement
                    .requestPointerLock();

            }

        }
    );


    document.addEventListener(
        "mousemove",
        event => {

            if (
                document.pointerLockElement !==
                renderer.domElement
            ) {
                return;
            }


            yaw -=
                event.movementX * 0.002;


            pitch -=
                event.movementY * 0.002;


            pitch =
                Math.max(
                    -1.4,
                    Math.min(
                        1.4,
                        pitch
                    )
                );


            camera.rotation.order =
                "YXZ";


            camera.rotation.y =
                yaw;


            camera.rotation.x =
                pitch;

        }
    );

}


/* =====================================================
   MOBILE CAMERA LOOK
===================================================== */

export function setupMobileLook(
    camera
) {

    let looking = false;

    let previousX = 0;
    let previousY = 0;


    document.addEventListener(
        "touchstart",
        event => {

            const touch =
                event.touches[0];

            if (!touch) {
                return;
            }


            const target =
                event.target;


            /*
                UI must NOT activate camera look.
            */

            if (
                target.closest(
                    "#interactButton"
                ) ||
                target.closest(
                    "#joystick"
                ) ||
                target.closest(
                    "#hintButton"
                ) ||
                target.closest(
                    "#pauseButton"
                ) ||
                target.closest(
                    "#inventoryButton"
                ) ||
                target.closest(
                    "#puzzlePanel"
                ) ||
                target.closest(
                    "#controls"
                ) ||
                target.closest(
                    "#startScreen"
                )
            ) {

                looking = false;

                return;

            }


            /*
                Right side = look.
            */

            if (
                touch.clientX >
                window.innerWidth * 0.45
            ) {

                looking = true;

                previousX =
                    touch.clientX;

                previousY =
                    touch.clientY;

            }

        }
    );


    document.addEventListener(
        "touchmove",
        event => {

            if (!looking) {
                return;
            }


            const touch =
                event.touches[0];

            if (!touch) {
                return;
            }


            event.preventDefault();


            const dx =
                touch.clientX -
                previousX;


            const dy =
                touch.clientY -
                previousY;


            previousX =
                touch.clientX;


            previousY =
                touch.clientY;


            yaw -=
                dx * 0.004;


            pitch -=
                dy * 0.004;


            pitch =
                Math.max(
                    -1.4,
                    Math.min(
                        1.4,
                        pitch
                    )
                );


            camera.rotation.order =
                "YXZ";


            camera.rotation.y =
                yaw;


            camera.rotation.x =
                pitch;

        },
        {
            passive: false
        }
    );


    document.addEventListener(
        "touchend",
        () => {

            looking = false;

        }
    );


    document.addEventListener(
        "touchcancel",
        () => {

            looking = false;

        }
    );

}


/* =====================================================
   PLAYER MOVEMENT
===================================================== */

export function updatePlayer(
    camera
) {

    let forward = 0;
    let sideways = 0;


    /* Keyboard */

    if (keys["w"])
        forward += 1;

    if (keys["s"])
        forward -= 1;

    if (keys["a"])
        sideways -= 1;

    if (keys["d"])
        sideways += 1;


    /* Mobile */

    forward += -joystickY;

    sideways += joystickX;


    /* Normalize */

    const length =
        Math.sqrt(
            forward * forward +
            sideways * sideways
        );


    if (length > 1) {

        forward /= length;
        sideways /= length;

    }


    /* Forward */

    camera.position.x +=
        Math.sin(yaw) *
        forward *
        speed;


    camera.position.z +=
        Math.cos(yaw) *
        forward *
        speed;


    /* Sideways */

    camera.position.x +=
        Math.cos(yaw) *
        sideways *
        speed;


    camera.position.z -=
        Math.sin(yaw) *
        sideways *
        speed;


    /* Room boundaries */

    camera.position.x =
        Math.max(
            -4.5,
            Math.min(
                4.5,
                camera.position.x
            )
        );


    camera.position.z =
        Math.max(
            -8.5,
            Math.min(
                8.5,
                camera.position.z
            )
        );


    /*
        Human eye level.
    */

    camera.position.y = 2.2;

}