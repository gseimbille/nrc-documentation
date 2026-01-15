---
title: Crossing logic
sidebar_position: 9
---

The logic defines when sounds (repetitions and intensities) are triggered and when electrical stimuli are initiated.

This logic can be updated remotely per collar based on the farmer's needs.

## Events
| Event | Details |
| --- | --- |
| Zone entry sound | No sound on buffer-zone entry |
| Perimeter crossing sound | As soon as the animal enters the buffer zone (1), a strong continuous warning sound starts |
| Perimeter crossing sound | The sound lasts 5 seconds (single sound event) |
| Electrical stimulus trigger | If the animal does not move back within 5 seconds of the sound, one electrical stimulus is delivered |

## Definitions
(1) **Buffer zone**: the 2-meter zone before the perimeter limit.

Electrical stimulus values: 0.5 J at 2 kV (instantaneous).

If no message is received by Datacake for more than 1 hour, an email is sent. The logic is not affected; only event transmission stops.

![Email notification example](/img/clovir/image14.png)

## Status examples
The images below show an example perimeter (Thonon) and the collar status in Datacake during power-on and zone entry.

![Status example 1](/img/clovir/image1.png)

![Status example 2](/img/clovir/image11.jpg)

![Status example 3](/img/clovir/image12.jpg)
