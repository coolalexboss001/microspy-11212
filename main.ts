enum RadioMessage {
    message1 = 49434
}
input.onButtonPressed(Button.A, function () {
    if (is_selecting == 1) {
        mode += -1
        if (mode < min_modes) {
            mode = max_modes
        }
    } else if (is_selecting == 0) {
        if (mode == 1) {
            if (message_id == 1) {
                radio.sendString("Pod sem")
                basic.showLeds(`
                    . . . . .
                    . . . . #
                    . . . # .
                    # . # . .
                    . # . . .
                    `)
                music.playMelody("- F G A B C5 - - ", 400)
            } else if (message_id == 2) {
                radio.sendString("Musim koncit")
                basic.showLeds(`
                    . . . . .
                    . . . . #
                    . . . # .
                    # . # . .
                    . # . . .
                    `)
                music.playMelody("- - - F G A B C5 ", 400)
            } else if (message_id == 3) {
                radio.sendString("Pod na zakladnu")
                basic.showLeds(`
                    . . . . .
                    . . . . #
                    . . . # .
                    # . # . .
                    . # . . .
                    `)
                music.playMelody("E A - - - - - - ", 400)
            } else if (message_id == 4) {
                radio.sendString("Kde si")
                basic.showLeds(`
                    . . . . .
                    . . . . #
                    . . . # .
                    # . # . .
                    . # . . .
                    `)
                music.playMelody("E A - - - - - - ", 400)
            } else if (message_id == 5) {
                radio.sendString("B")
                basic.showLeds(`
                    . . . . .
                    . . . . #
                    . . . # .
                    # . # . .
                    . # . . .
                    `)
                music.playMelody("E A - - - - - - ", 400)
            } else if (message_id == 6) {
                radio.sendString("C")
                basic.showLeds(`
                    . . . . .
                    . . . . #
                    . . . # .
                    # . # . .
                    . # . . .
                    `)
                music.playMelody("E A - - - - - - ", 400)
            } else if (message_id == 7) {
                radio.sendString("Utok?")
                basic.showLeds(`
                    . . . . .
                    . . . . #
                    . . . # .
                    # . # . .
                    . # . . .
                    `)
                music.playMelody("E A - - - - - - ", 400)
            } else if (message_id == 8) {
                radio.sendString("+")
                basic.showLeds(`
                    . . . . .
                    . . . . #
                    . . . # .
                    # . # . .
                    . # . . .
                    `)
                music.playMelody("E A - - - - - - ", 400)
            } else {
                radio.sendString("-")
                basic.showLeds(`
                    . . . . .
                    . . . . #
                    . . . # .
                    # . # . .
                    . # . . .
                    `)
            }
        } else {
            group += -1
            if (group < 1) {
                min_modes = 255
            }
        }
    }
})
input.onGesture(Gesture.Shake, function () {
    radio.sendString("Pomoc")
    music.play(music.stringPlayable("- A B C5 C5 C5 C5 C5 ", 144), music.PlaybackMode.UntilDone)
})
radio.onReceivedString(function (receivedString) {
    music.playMelody("D - G B C5 C5 C5 C5 ", 400)
    basic.showString(receivedString)
})
input.onButtonPressed(Button.B, function () {
    if (is_selecting == 1) {
        mode += 1
        if (mode > max_modes) {
            mode = min_modes
        }
    } else {
        if (mode == 1) {
            message_id += 1
            if (message_id > 9) {
                message_id = 1
            }
        } else {
            group += 1
            if (group > 255) {
                min_modes = 1
            }
        }
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    music.play(music.tonePlayable(330, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
    if (is_selecting == 1) {
        is_selecting = 0
    } else {
        is_selecting = 1
    }
})
let group = 0
let min_modes = 0
let max_modes = 0
let mode = 0
let is_selecting = 0
let message_id = 0
message_id = 1
is_selecting = 1
mode = 1
max_modes = 3
min_modes = 1
group = 64
radio.setGroup(group)
basic.forever(function () {
    if (is_selecting == 0) {
        if (mode == 1) {
            basic.showString("" + (message_id))
        } else if (mode == 2) {
            radio.setGroup(group)
            basic.showNumber(group)
            basic.pause(1000)
        } else {
            basic.showString("" + (input.temperature()))
        }
    } else {
        if (mode == 1) {
            basic.showLeds(`
                . . . . .
                . # # # .
                . # # # .
                . # # # .
                # . . . .
                `)
        } else if (mode == 2) {
            basic.showLeds(`
                # . # . #
                . # . # .
                # . # . #
                . # . # .
                # . # . #
                `)
        } else {
            basic.showLeds(`
                . . # . .
                . . # # .
                . # # . .
                . . # # .
                . # # . .
                `)
        }
    }
})
