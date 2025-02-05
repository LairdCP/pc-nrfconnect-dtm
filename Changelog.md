## 2.1.0 - 2023-04-03

## Added

-   Port selection for devices with multiple serialports.
-   Selected ports are persisted per device.

## Fixed

-   While receiving in sweep mode, the transmitter tab wrongly showed a sweep
    pattern. Now the tab of the non-active mode states that only the other tab
    shows results.
-   Devices were sometimes mistakenly detected as having readback protection.

## 2.0.4 - 2023-02-13

## Changed

-   Increased required nRF Connect for Desktop version to v4.0.0.
-   If the firmware is wrong and the device is readback protected, offer a
    solution that recovers the device.

## 2.0.3 - 2022-09-05

### Changed

-   Increased required nRF Connect for Desktop version to 3.12.

## 2.0.2 - 2022-21-04

### Fixed

-   DTM did not display all serialport devices.

## 2.0.1 - 2022-01-04

### Fixed

-   Device busy error after de- and reselecting a device.

### Changed

-   New icon.

## 2.0.0 - 2021-11-01

### Changed

-   Establish compatibility with nRF Connect for Desktop 3.8
-   New UI design.
-   Split Transmitter and Receiver into seperate panes.
-   Timeout updates UI after completion.

## 1.1.7 - 2021-02-22

### Removed

-   Live view of captured packets in receive mode. Packets are only displayed in
    the UI after sampling has stopped.

## 1.1.6 - 2020-11-27

### Fixed

-   Constant carrier for transmitter.

## 1.1.5 - 2020-09-16

### Changed

-   Enable constant carrier for transmitter.

## 1.1.4 - 2020-07-08

### Fixed

-   Not showing a graph when selecting -40 dBm output.
-   Tooltip value when hovering over the TX bar.

## 1.1.3 - 2020-06-09

### Added

-   Support for custom firmware with Nordic device.

## 1.1.2 - 2020-05-04

### Changed

-   Allow 2Mb phy for unknown devices.

## 1.1.1

### Fixed

-   Avoid programming custom devices.

## 1.1.0 - 2020-01-15

### Added

-   Support custom devices and custom firmware.
-   Support for physical serialport on Windows.

## 1.0.0 - 2020-01-08

-   Initial public release.
