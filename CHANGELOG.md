# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2022-08-24
☮️ Peace in the world, or the world in pieces. 🕊️
## Added
- Support for dnd5e, SWADE and Simple Worldbuilding (thanks @EsotericOdyssey for the latter).
- Info dialogue that informs about system support. Will only be shown once to a GM.
- There now is a (hopefully) easy way to set up support for other game systems.
- New Translation Strings.
## Fixed
- Fixed a bug that used a wildcard folder if an exact audio file was given.
- Fixed a bug that caused the chat message sound to play for the sender on core v10+.
- Fixed deprecation warnings when sending a chat message on core v10+.
- Prevent repetitive render sounds when editing sheets.

## [1.0.1] - 2022-08-21
### Fixed
- Chat message notification not playing.
### Changed
- Changes to translation strings to reflect recent changes.
- Chat message notifications won't play for the user who sends them anymore.
- Added min and compatible core version to the manifest used by FVTT core v9 and earlier to get rid of the warning in v9.

## [1.0.0] - 2022-08-21
### Added
- v10 and v9 backwards compatibility.
- A way to select a single file instead of a folder.
- A way to set up wildcard files using asterisk (*). A file path with an asterisk will automatically be treated as a wildcard path. The asterisk acts as a placeholder similar to the way wildcard token images are handled by core.
- New translation strings, other were edited.
- A help button with useful information was added to the setup dialogues.
- Setup dialogues slightly resized in width.
- Drastically reduced the text in setup dialogues (the information can now be found when pressing the help button).
- Added a second button to select folders while the original button only accepts files.
- The setting for the chat message now relies on core file picker instead of using Settings Extender.
### Removed
- Dependency for Settings Extender removed.
### Changed
- Changed the message notification file picker to foundry native one.
- Changed manifest to fit Foundry v10.
- Whisper messages are no longer affected by the IR sound. IR will neither change the default whisper sound nor will it play its sound when a whisper message is sent.
- Chat message notification defaults to `sounds/notify.wav` which is the core sound for whispers.
### Fixed
- The chat message notification now only plays for the current user. Previously it played on all accounts *for* all accounts.
- IR will no longer play its chat notification sound on a whisper message (*for everyone*).

## [0.1.1] - 2022-08-19
### Added
- Flags in module.json to enter the package jam 2022.

## [0.1.0] - 2022-08-19
Initial Release.