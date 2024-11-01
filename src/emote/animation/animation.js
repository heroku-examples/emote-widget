import anime from "animejs";
import { debounce } from "throttle-debounce";

const emojiUrlLookup = {
  celebrate:
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDdweCIgaGVpZ2h0PSI0N3B4IiB2aWV3Qm94PSIwIDAgNDcgNDciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+eWF5LWxnPC90aXRsZT4KICAgIDxnIGlkPSJ5YXktbGciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJHcm91cC0yIj48L2c+CiAgICAgICAgPGcgaWQ9Ikdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMS44OTUzNjUsIDI5LjUwMzY1NCkgcm90YXRlKC00LjAwMDAwMCkgdHJhbnNsYXRlKC0xMS44OTUzNjUsIC0yOS41MDM2NTQpIHRyYW5zbGF0ZSgtNC4xMDQ2MzUsIDE2LjAwMzY1NCkiPgogICAgICAgICAgICA8cGF0aCBkPSJNNS4yNjg4NTMwMiwyMC45OTU0NjAxIEwxOC43NjA0OTgxLDUuMDM4MzU5NTQgQzE5LjQ3MzY2MjEsNC4xOTQ4NzIyNyAyMC43MzU1Nzc0LDQuMDg5MjI0NDQgMjEuNTc5MDY0Nyw0LjgwMjM4ODUyIEMyMS44MzYxOTM4LDUuMDE5Nzg5ODEgMjIuMDM0MjcyMyw1LjI5ODU5MTExIDIyLjE1NDkzNyw1LjYxMjk0NTU2IEwyOC4zOTI4MDE3LDIxLjg2Mzc2NjUgQzI4Ljc4ODYzMDcsMjIuODk0OTc2MSAyOC4yNzM1NTI5LDI0LjA1MTgxOTQgMjcuMjQyMzQzNCwyNC40NDc2NDg0IEMyNy4wMDQyNDY1LDI0LjUzOTA0MTcgMjYuNzUwODY2OSwyNC41ODQwNTMxIDI2LjQ5NTg2MDIsMjQuNTgwMjU2NyBMNi43NjYzNTA0LDI0LjI4NjUzNjMgQzUuNjYxOTAzMjksMjQuMjcwMDk0IDQuNzc5OTAxMTIsMjMuMzYxNDMzNiA0Ljc5NjM0MzQzLDIyLjI1Njk4NjUgQzQuODAzMjI4NzksMjEuNzk0NDg5OSA0Ljk3MDIwOTUxLDIxLjM0ODY3NzYgNS4yNjg4NTMwMiwyMC45OTU0NjAxIFoiIGlkPSJQYXRoLTMiIGZpbGw9IiNGRkQxMDUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1Ljk5NTk0NSwgMTMuNTQwNDMwKSByb3RhdGUoLTEwLjAwMDAwMCkgdHJhbnNsYXRlKC0xNS45OTU5NDUsIC0xMy41NDA0MzApICI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMjcuMDUwNDU5OSwyMi4zNDQ5NTI2IEMyOC4xNTk4NjQ3LDIxLjc0MTY4OTIgMjcuNTIyOTE3OCwxNi44NzkzODY3IDI1Ljg0MDUyMzYsMTEuNzU1Njk3NCBDMjQuMTU4MTI5NSw2LjYzMjAwODExIDIxLjg0MDk1NjIsMi44NjcwNDkzMSAyMC43MzE1NTE0LDMuNDcwMzEyNzUgQzE5LjYyMjE0NjYsNC4wNzM1NzYyIDIwLjE0MDYxOTMsOC44MTY2MTgyOSAyMS44MjMwMTM0LDEzLjk0MDMwNzYgQzIzLjUwNTQwNzYsMTkuMDYzOTk2OSAyNS45NDEwNTUsMjIuOTQ4MjE2MSAyNy4wNTA0NTk5LDIyLjM0NDk1MjYgWiIgaWQ9Ik92YWwiIHN0cm9rZT0iI0ZGRDEwNSIgZmlsbD0iI0UyQkIwRSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjMuODc0MzE3LCAxMi45MDY4MDEpIHJvdGF0ZSgtMTMuMDAwMDAwKSB0cmFuc2xhdGUoLTIzLjg3NDMxNywgLTEyLjkwNjgwMSkgIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgICAgIDxwYXRoIGQ9Ik0yMC4zMjk1MDUzLDIwLjAzNjAxODIgQzIzLjkwNDAzNDksMTUuNTM0NTQwOCAyNS4wNzI3MzkyLDExLjIwNDcyMDYgMjMuODM1NjE4Myw3LjA0NjU1NzY2IiBpZD0iUGF0aC00IiBzdHJva2U9IiMxQUI2QkEiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0iIzFBQjZCQSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMi4zMjExMTgsIDEzLjU0MTI4OCkgcm90YXRlKC02LjAwMDAwMCkgdHJhbnNsYXRlKC0yMi4zMjExMTgsIC0xMy41NDEyODgpICI+PC9wYXRoPgogICAgICAgIDxwYXRoIGQ9Ik0yNy40NzE2Nzk3LDI4LjQ2MzM3ODkgQzMyLjM1Njc3MDgsMjguMjI4NzExOCAzNS44NjYyMTA5LDI5LjgwMzc2MSAzOCwzMy4xODg1MjY2IiBpZD0iUGF0aC00LUNvcHkiIHN0cm9rZT0iI0UwMTA1MCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBzdHJva2U9IiM3RTJEQzgiIGZpbGw9IiM3RTJEQzgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1LjUwMDAwMCwgMTAuNTAwMDAwKSByb3RhdGUoNC4wMDAwMDApIHRyYW5zbGF0ZSgtMTUuNTAwMDAwLCAtMTAuNTAwMDAwKSAiIGN4PSIxNS41IiBjeT0iMTAuNSIgcj0iMS41Ij48L2NpcmNsZT4KICAgICAgICA8cGF0aCBkPSJNMzIuMzk1MzY5Niw3Ljk5NjI4NDMzIEMzMy4yMjE3NDQ2LDguMDU0MDcwMSAzMy45Mzg0OTg2LDcuNDMxMDA1NDEgMzMuOTk2Mjg0Myw2LjYwNDYzMDM5IEMzNC4wNTQwNzAxLDUuNzc4MjU1MzggMzMuNDMxMDA1NCw1LjA2MTUwMTQ0IDMyLjYwNDYzMDQsNS4wMDM3MTU2NyBDMzEuNzc4MjU1NCw0Ljk0NTkyOTkgMzEuMDYxNTAxNCw1LjU2ODk5NDU5IDMxLjAwMzcxNTcsNi4zOTUzNjk2MSBDMzAuOTQ1OTI5OSw3LjIyMTc0NDYyIDMxLjU2ODk5NDYsNy45Mzg0OTg1NiAzMi4zOTUzNjk2LDcuOTk2Mjg0MzMgWiIgaWQ9Ik92YWwtQ29weSIgc3Ryb2tlPSIjRTAxMDUwIiBmaWxsPSIjRTAxMDUwIj48L3BhdGg+CiAgICAgICAgPHBhdGggZD0iTTMxLjM5NTM2OTYsMzcuOTk2Mjg0MyBDMzIuMjIxNzQ0NiwzOC4wNTQwNzAxIDMyLjkzODQ5ODYsMzcuNDMxMDA1NCAzMi45OTYyODQzLDM2LjYwNDYzMDQgQzMzLjA1NDA3MDEsMzUuNzc4MjU1NCAzMi40MzEwMDU0LDM1LjA2MTUwMTQgMzEuNjA0NjMwNCwzNS4wMDM3MTU3IEMzMC43NzgyNTU0LDM0Ljk0NTkyOTkgMzAuMDYxNTAxNCwzNS41Njg5OTQ2IDMwLjAwMzcxNTcsMzYuMzk1MzY5NiBDMjkuOTQ1OTI5OSwzNy4yMjE3NDQ2IDMwLjU2ODk5NDYsMzcuOTM4NDk4NiAzMS4zOTUzNjk2LDM3Ljk5NjI4NDMgWiIgaWQ9Ik92YWwtQ29weS0yIiBzdHJva2U9IiMxQUI2QkEiIGZpbGw9IiMxQUI2QkEiPjwvcGF0aD4KICAgICAgICA8cGF0aCBkPSJNMzUsMjMuMzIwMTc3OCBDMzcuNTg4NTgyMiwyMi43Mjk0OTc2IDM5LjU4ODU4MjIsMjIuOTU2MTA0OSA0MSwyNCIgaWQ9IlBhdGgtOSIgc3Ryb2tlPSIjRkZENjIxIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzguMDAwMDAwLCAyMy41MDAwMDApIHJvdGF0ZSgyLjAwMDAwMCkgdHJhbnNsYXRlKC0zOC4wMDAwMDAsIC0yMy41MDAwMDApICI+PC9wYXRoPgogICAgICAgIDxwYXRoIGQ9Ik0yNi4wMzk1NTA4LDIyLjgxODM1OTQgQzMyLjE2NTQxMTgsMTQuNTgxODAxMyAzNy43Nzg2OTMsMTAuOTEzMTgxNSA0Mi44NzkzOTQ1LDExLjgxMjUiIGlkPSJQYXRoLTEwIiBzdHJva2U9IiM3RTJEQzgiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0iIzdFMkRDOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==",
  heart:
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDdweCIgaGVpZ2h0PSI0N3B4IiB2aWV3Qm94PSIwIDAgNDcgNDciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+bG92ZS1sZzwvdGl0bGU+CiAgICA8ZyBpZD0ibG92ZS1sZyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTE2LjAzMzM2MTUsMTQuMDEzNTEzNSBDMjYuMjI3NDE2OSwyOC45MjIxODA1IDM1LjEwMTY2NzYsMzQuNDE2NTIyMyA0My4wMzkwNjgyLDMyLjY3NjE5OTEgQzUxLjI2NTg4NTEsMzAuODcyNDE5NSA1My45MjM1MzcxLDIxLjE4MTMyMTEgNDAuOTAwMDgxLDE0LjAxMzUxMzUgTDE2LjAzMzM2MTUsMTQuMDEzNTEzNSBaIiBpZD0iaGVhcnQtY29weSIgZmlsbD0iI0UwMTA1MCIgZmlsbC1ydWxlPSJub256ZXJvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMi45ODY0ODYsIDIzLjUwMDAwMCkgcm90YXRlKC05MC4wMDAwMDApIHRyYW5zbGF0ZSgtMzIuOTg2NDg2LCAtMjMuNTAwMDAwKSAiPjwvcGF0aD4KICAgICAgICA8cGF0aCBkPSJNLTIuOTM5NjExNDksMTQuMDEzNTEzNSBDNy4yNTQ0NDM5MSwyOC45MjIxODA1IDE2LjEyODY5NDYsMzQuNDE2NTIyMyAyNC4wNjYwOTUzLDMyLjY3NjE5OTEgQzMyLjI5MjkxMjEsMzAuODcyNDE5NSAzNC45NTA1NjQxLDIxLjE4MTMyMTEgMjEuOTI3MTA4LDE0LjAxMzUxMzUgTC0yLjkzOTYxMTQ5LDE0LjAxMzUxMzUgWiIgaWQ9ImhlYXJ0LWNvcHktMiIgZmlsbD0iI0UwMTA1MCIgZmlsbC1ydWxlPSJub256ZXJvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNC4wMTM1MTQsIDIzLjUwMDAwMCkgc2NhbGUoLTEsIDEpIHJvdGF0ZSgtOTAuMDAwMDAwKSB0cmFuc2xhdGUoLTE0LjAxMzUxNCwgLTIzLjUwMDAwMCkgIj48L3BhdGg+CiAgICAgICAgPGVsbGlwc2UgaWQ9Ik92YWwiIGZpbGw9IiNFMDEwNTAiIGN4PSIyMy41IiBjeT0iMjgiIHJ4PSI0LjUiIHJ5PSIxMiI+PC9lbGxpcHNlPgogICAgPC9nPgo8L3N2Zz4=",
  plusone:
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDdweCIgaGVpZ2h0PSI0N3B4IiB2aWV3Qm94PSIwIDAgNDcgNDciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGx1cy1sZzwvdGl0bGU+CiAgICA8ZyBpZD0icGx1cy1sZyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTEyLjc0MDE3NCwzOC45OTg1ODk2IEMxMy40MjI4MjU2LDM4Ljk5ODU4OTYgMTMuOTk2ODczNSwzOC43NzM2MjQ4IDE0LjQ2MjMxNzgsMzguMzIzNjk1MyBDMTQuOTI3NzYyMSwzNy44NzM3NjU5IDE1LjE2MDQ4NDMsMzcuMzA3NDc1MyAxNS4xNjA0ODQzLDM2LjYyNDgyMzcgTDE1LjE2MDQ4NDMsMzYuNjI0ODIzNyBMMTUuMTYwNDg0MywzMC4wNjIwNTkyIEwyMS42NzY3MDQzLDMwLjA2MjA1OTIgQzIyLjM1OTM1NTksMzAuMDYyMDU5MiAyMi45MzM0MDM5LDI5LjgyOTMzNzEgMjMuMzk4ODQ4MSwyOS4zNjM4OTI4IEMyMy44NjQyOTI0LDI4Ljg5ODQ0ODUgMjQuMDk3MDE0NiwyOC4zMjQ0MDA2IDI0LjA5NzAxNDYsMjcuNjQxNzQ4OSBDMjQuMDk3MDE0NiwyNi45NTkwOTczIDIzLjg2NDI5MjQsMjYuMzkyODA2OCAyMy4zOTg4NDgxLDI1Ljk0Mjg3NzMgQzIyLjkzMzQwMzksMjUuNDkyOTQ3OCAyMi4zNTkzNTU5LDI1LjI2Nzk4MzEgMjEuNjc2NzA0MywyNS4yNjc5ODMxIEwyMS42NzY3MDQzLDI1LjI2Nzk4MzEgTDE1LjE2MDQ4NDMsMjUuMjY3OTgzMSBMMTUuMTYwNDg0MywxOC43MDUyMTg2IEMxNS4xNjA0ODQzLDE4LjAyMjU2NyAxNC45Mjc3NjIxLDE3LjQ0ODUxOSAxNC40NjIzMTc4LDE2Ljk4MzA3NDggQzEzLjk5Njg3MzUsMTYuNTE3NjMwNSAxMy40MjI4MjU2LDE2LjI4NDkwODMgMTIuNzQwMTc0LDE2LjI4NDkwODMgQzEyLjA1NzUyMjMsMTYuMjg0OTA4MyAxMS40ODM0NzQ0LDE2LjUxNzYzMDUgMTEuMDE4MDMwMSwxNi45ODMwNzQ4IEMxMC41NTI1ODU4LDE3LjQ0ODUxOSAxMC4zMTk4NjM3LDE4LjAyMjU2NyAxMC4zMTk4NjM3LDE4LjcwNTIxODYgTDEwLjMxOTg2MzcsMTguNzA1MjE4NiBMMTAuMzE5ODYzNywyNS4yNjc5ODMxIEwzLjgwMzY0MzYzLDI1LjI2Nzk4MzEgQzMuMTIwOTkyMDEsMjUuMjY3OTgzMSAyLjU0Njk0NDA1LDI1LjQ5Mjk0NzggMi4wODE0OTk3NiwyNS45NDI4NzczIEMxLjYxNjA1NTQ4LDI2LjM5MjgwNjggMS4zODMzMzMzMywyNi45NTkwOTczIDEuMzgzMzMzMzMsMjcuNjQxNzQ4OSBDMS4zODMzMzMzMywyOC4zMjQ0MDA2IDEuNjE2MDU1NDgsMjguODk4NDQ4NSAyLjA4MTQ5OTc2LDI5LjM2Mzg5MjggQzIuNTQ2OTQ0MDUsMjkuODI5MzM3MSAzLjEyMDk5MjAxLDMwLjA2MjA1OTIgMy44MDM2NDM2MywzMC4wNjIwNTkyIEwzLjgwMzY0MzYzLDMwLjA2MjA1OTIgTDEwLjMxOTg2MzcsMzAuMDYyMDU5MiBMMTAuMzE5ODYzNywzNi42MjQ4MjM3IEMxMC4zMTk4NjM3LDM3LjMwNzQ3NTMgMTAuNTUyNTg1OCwzNy44NzM3NjU5IDExLjAxODAzMDEsMzguMzIzNjk1MyBDMTEuNDgzNDc0NCwzOC43NzM2MjQ4IDEyLjA1NzUyMjMsMzguOTk4NTg5NiAxMi43NDAxNzQsMzguOTk4NTg5NiBaIE00MS44Njg1MjM3LDQxIEM0NC4xMzM2ODU5LDQxIDQ1LjI2NjI2Nyw0MC4wMjI1NjcgNDUuMjY2MjY3LDM4LjA2NzcwMSBDNDUuMjY2MjY3LDM2LjE0Mzg2NDYgNDQuMTMzNjg1OSwzNS4xODE5NDY0IDQxLjg2ODUyMzcsMzUuMTgxOTQ2NCBMNDEuODY4NTIzNywzNS4xODE5NDY0IEwzNy41Mzk4OTE5LDM1LjE4MTk0NjQgTDM3LjUzOTg5MTksMTEuNTM3Mzc2NiBDMzcuNTM5ODkxOSwxMC40NTEzMzk5IDM3LjIxNDA4MDksOS41OTAyNjc5OCAzNi41NjI0NTg5LDguOTU0MTYwNzkgQzM1LjkxMDgzNjksOC4zMTgwNTM2IDM1LjA3MzAzNzEsOCAzNC4wNDkwNTk3LDggQzMyLjk2MzAyMyw4IDMxLjg3Njk4NjQsOC4zMjU4MTEgMzAuNzkwOTQ5Nyw4Ljk3NzQzMyBMMzAuNzkwOTQ5Nyw4Ljk3NzQzMyBMMjMuNDM2OTI5OSwxMy4zOTkxNTM3IEMyMi40NzUwMTE4LDEzLjk1NzY4NjkgMjEuOTk0MDUyNywxNC43Nzk5NzE4IDIxLjk5NDA1MjcsMTUuODY2MDA4NSBDMjEuOTk0MDUyNywxNi42NzI3Nzg2IDIyLjI2NTU2MTgsMTcuNDAxOTc0NiAyMi44MDg1ODAyLDE4LjA1MzU5NjYgQzIzLjM1MTU5ODUsMTguNzA1MjE4NiAyNC4wMTA5Nzc5LDE5LjAzMTAyOTYgMjQuNzg2NzE4NCwxOS4wMzEwMjk2IEMyNS4yNTIxNjI3LDE5LjAzMTAyOTYgMjUuNzE3NjA3LDE4Ljg5MTM5NjMgMjYuMTgzMDUxMiwxOC42MTIxMjk4IEwyNi4xODMwNTEyLDE4LjYxMjEyOTggTDMwLjI3ODk2MSwxNi4xNDUyNzUgTDMwLjI3ODk2MSwzNS4xODE5NDY0IEwyNS45NTAzMjkxLDM1LjE4MTk0NjQgQzIzLjY1NDEzNzMsMzUuMTgxOTQ2NCAyMi41MDYwNDE0LDM2LjE0Mzg2NDYgMjIuNTA2MDQxNCwzOC4wNjc3MDEgQzIyLjUwNjA0MTQsNDAuMDIyNTY3IDIzLjY1NDEzNzMsNDEgMjUuOTUwMzI5MSw0MSBMMjUuOTUwMzI5MSw0MSBMNDEuODY4NTIzNyw0MSBaIiBpZD0iKzEiIGZpbGw9IiMwMEI4QkQiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=",
  question:
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDdweCIgaGVpZ2h0PSI0N3B4IiB2aWV3Qm94PSIwIDAgNDcgNDciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cXVlc3Rpb24tbGc8L3RpdGxlPgogICAgPGcgaWQ9InF1ZXN0aW9uLWxnIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMjMuNDI1LDI5LjU1IEMyNC4xMjUsMjkuNTUgMjQuNzMzMzMzMywyOS4zNSAyNS4yNSwyOC45NSBDMjUuNzY2NjY2NywyOC41NSAyNi4wOTE2NjY3LDI3Ljk4MzMzMzMgMjYuMjI1LDI3LjI1IEMyNi4zOTE2NjY3LDI2LjU1IDI2Ljc2NjY2NjcsMjUuODc1IDI3LjM1LDI1LjIyNSBDMjcuOTMzMzMzMywyNC41NzUgMjguNzc1LDIzLjggMjkuODc1LDIyLjkgQzMxLjA0MTY2NjcsMjEuODY2NjY2NyAzMS45OTE2NjY3LDIwLjk4MzMzMzMgMzIuNzI1LDIwLjI1IEMzMy40NTgzMzMzLDE5LjUxNjY2NjcgMzQuMDgzMzMzMywxOC42MzMzMzMzIDM0LjYsMTcuNiBDMzUuMTE2NjY2NywxNi41NjY2NjY3IDM1LjM3NSwxNS40MzMzMzMzIDM1LjM3NSwxNC4yIEMzNS4zNzUsMTIuNTMzMzMzMyAzNC44OTE2NjY3LDExLjA0MTY2NjcgMzMuOTI1LDkuNzI1IEMzMi45NTgzMzMzLDguNDA4MzMzMzMgMzEuNjI1LDcuMzc1IDI5LjkyNSw2LjYyNSBDMjguMjI1LDUuODc1IDI2LjI5MTY2NjcsNS41IDI0LjEyNSw1LjUgQzIyLjE5MTY2NjcsNS41IDIwLjI2NjY2NjcsNS44MDgzMzMzMyAxOC4zNSw2LjQyNSBDMTYuNDMzMzMzMyw3LjA0MTY2NjY3IDE0LjcyNSw3LjkgMTMuMjI1LDkgQzEyLjY1ODMzMzMsOS40MzMzMzMzMyAxMi4yNSw5Ljg4MzMzMzMzIDEyLDEwLjM1IEMxMS43NSwxMC44MTY2NjY3IDExLjYyNSwxMS40IDExLjYyNSwxMi4xIEMxMS42MjUsMTMuMTMzMzMzMyAxMS45MTY2NjY3LDE0LjAwODMzMzMgMTIuNSwxNC43MjUgQzEzLjA4MzMzMzMsMTUuNDQxNjY2NyAxMy43OTE2NjY3LDE1LjggMTQuNjI1LDE1LjggQzE1LjMyNSwxNS44IDE2LjI0MTY2NjcsMTUuNDgzMzMzMyAxNy4zNzUsMTQuODUgTDE3LjM3NSwxNC44NSBMMTguNTc1LDE0LjI1IEMxOS41MDgzMzMzLDEzLjcxNjY2NjcgMjAuMzUsMTMuMzA4MzMzMyAyMS4xLDEzLjAyNSBDMjEuODUsMTIuNzQxNjY2NyAyMi42MDgzMzMzLDEyLjYgMjMuMzc1LDEyLjYgQzI0LjMwODMzMzMsMTIuNiAyNS4wNDE2NjY3LDEyLjgxNjY2NjcgMjUuNTc1LDEzLjI1IEMyNi4xMDgzMzMzLDEzLjY4MzMzMzMgMjYuMzc1LDE0LjI2NjY2NjcgMjYuMzc1LDE1IEMyNi4zNzUsMTUuNzMzMzMzMyAyNi4xODMzMzMzLDE2LjQgMjUuOCwxNyBDMjUuNDE2NjY2NywxNy42IDI0Ljg0MTY2NjcsMTguMzE2NjY2NyAyNC4wNzUsMTkuMTUgQzIzLjAwODMzMzMsMjAuMjUgMjIuMTc1LDIxLjMyNSAyMS41NzUsMjIuMzc1IEMyMC45NzUsMjMuNDI1IDIwLjY3NSwyNC43MzMzMzMzIDIwLjY3NSwyNi4zIEMyMC42NzUsMjcuMzMzMzMzMyAyMC45MTY2NjY3LDI4LjEzMzMzMzMgMjEuNCwyOC43IEMyMS44ODMzMzMzLDI5LjI2NjY2NjcgMjIuNTU4MzMzMywyOS41NSAyMy40MjUsMjkuNTUgWiBNMjMuNTI1LDQxLjUgQzI0LjkyNSw0MS41IDI2LjA4MzMzMzMsNDEuMDMzMzMzMyAyNyw0MC4xIEMyNy45MTY2NjY3LDM5LjE2NjY2NjcgMjguMzc1LDM4LjAxNjY2NjcgMjguMzc1LDM2LjY1IEMyOC4zNzUsMzUuMjgzMzMzMyAyNy45MTY2NjY3LDM0LjEzMzMzMzMgMjcsMzMuMiBDMjYuMDgzMzMzMywzMi4yNjY2NjY3IDI0LjkyNSwzMS44IDIzLjUyNSwzMS44IEMyMi4xNTgzMzMzLDMxLjggMjEuMDE2NjY2NywzMi4yNjY2NjY3IDIwLjEsMzMuMiBDMTkuMTgzMzMzMywzNC4xMzMzMzMzIDE4LjcyNSwzNS4yODMzMzMzIDE4LjcyNSwzNi42NSBDMTguNzI1LDM4LjAxNjY2NjcgMTkuMTgzMzMzMywzOS4xNjY2NjY3IDIwLjEsNDAuMSBDMjEuMDE2NjY2Nyw0MS4wMzMzMzMzIDIyLjE1ODMzMzMsNDEuNSAyMy41MjUsNDEuNSBaIiBpZD0iPyIgZmlsbD0iIzdFMkRDOCIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==",
  clap: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDdweCIgaGVpZ2h0PSI0N3B4IiB2aWV3Qm94PSIwIDAgNDcgNDciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+Y2xhcC1sZzwvdGl0bGU+CiAgICA8ZyBpZD0iY2xhcC1sZyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTMzLjc1MzEzNTEsMjEuMDY1MTk3MSBMMzMuNjUxMDI2MSwyMS4wMjg2Njg0IEMzMi42MDU5NDY4LDIwLjY1NDg5MTggMzEuNDU1NjQzMSwyMS4xOTkwODM4IDMxLjA4MTg2NjQsMjIuMjQ0MjQwOSBMMjkuNDE2MDMyOSwyNy42MzQwNTUzIEwyOS41NzE4MDU2LDI0LjQ0NTIzMTcgTDI5LjU3MTgwNTYsMjQuMDU1Nzk5OSBMMjkuNTcxODA1NiwxMC4zMTk4Mzg0IEMyOS41NzE4MDU2LDkuMzAyODc2MTYgMjguNzQ3NDU2Myw4LjQ3ODUyNjg3IDI3LjczMDU3MTksOC40Nzg1MjY4NyBMMjcuMjg1MDYxOSw4LjQ3ODUyNjg3IEMyNi4yNjgxNzc1LDguNDc4NTI2ODcgMjUuNDQzODI4Miw5LjMwMjg3NjE2IDI1LjQ0MzgyODIsMTAuMzE5ODM4NCBMMjUuNDQzODI4MiwyMy43ODMxOTc2IEMyNS40NDM4MjgyLDIzLjkzMzc1MiAyNS4zMjE3ODAzLDI0LjA1NTc5OTkgMjUuMTcxMjI2LDI0LjA1NTc5OTkgQzI1LjAyMDY3MTYsMjQuMDU1Nzk5OSAyNC44OTg2MjM3LDIzLjkzMzc1MiAyNC44OTg2MjM3LDIzLjc4MzE5NzYgTDI0Ljg5ODYyMzcsOC40MDIwNDI0NiBDMjQuODk4NjIzNyw3LjM2ODg3OTgzIDI0LjA2MTExMTYsNi41MzEzNjc3NSAyMy4wMjc5NDksNi41MzEzNjc3NSBMMjIuNjQxMzIxLDYuNTMxMzY3NzUgQzIxLjYwODE1ODQsNi41MzEzNjc3NSAyMC43NzA2NDYzLDcuMzY4ODc5ODMgMjAuNzcwNjQ2Myw4LjQwMjA0MjQ2IEwyMC43NzA2NDYzLDIzLjc4MzE5NzYgQzIwLjc3MDY0NjMsMjMuOTMzNzUyIDIwLjY0ODU5ODQsMjQuMDU1Nzk5OSAyMC40OTgwNDQsMjQuMDU1Nzk5OSBDMjAuMzQ3NDg5NywyNC4wNTU3OTk5IDIwLjIyNTQ0MTgsMjMuOTMzNzUyIDIwLjIyNTQ0MTgsMjMuNzgzMTk3NiBMMjAuMjI1NDQxOCwxMS4yMDMxNDc3IEMyMC4yMjU0NDE4LDEwLjE2OTk4NTEgMTkuMzg3OTI5Nyw5LjMzMjQ3Mjk4IDE4LjM1NDc2NzEsOS4zMzI0NzI5OCBMMTcuOTY4MTM5MSw5LjMzMjQ3Mjk4IEMxNi45MzQ5NzY1LDkuMzMyNDcyOTggMTYuMDk3NDY0NCwxMC4xNjk5ODUxIDE2LjA5NzQ2NDQsMTEuMjAzMTQ3NyBMMTYuMDk3NDY0NCwyMy43ODMxOTc2IEMxNi4wOTc0NjQ0LDIzLjkzMzc1MiAxNS45NzU0MTY1LDI0LjA1NTc5OTkgMTUuODI0ODYyMSwyNC4wNTU3OTk5IEMxNS42NzQzMDc4LDI0LjA1NTc5OTkgMTUuNTUyMjU5OSwyMy45MzM3NTIgMTUuNTUyMjU5OSwyMy43ODMxOTc2IEwxNS41NTIyNTk5LDE1LjA4ODc0MjcgQzE1LjU1MjI1OTksMTQuMTA1MDM3OSAxNC43NTQ3ODE0LDEzLjMwNzQ4MTUgMTMuNzcwOTk4NywxMy4zMDc0ODE1IEwxMy4yMDU1NDM3LDEzLjMwNzQ4MTUgQzEyLjIyMTc2MSwxMy4zMDc0ODE1IDExLjQyNDI4MjUsMTQuMTA1MDM3OSAxMS40MjQyODI1LDE1LjA4ODc0MjcgTDExLjQyNDI4MjUsMjQuMDU1Nzk5OSBMMTEuNDI0MjgyNSwyNC40NDUyMzE3IEwxMS40MjQyODI1LDMzLjYzMDY4MjMgQzExLjQyNDI4MjUsMzcuODA2MDE0NiAxNC44MDkwNjgyLDQxLjE5MDgwMDIgMTguOTg0NDAwNCw0MS4xOTA4MDAyIEwyMi4wMTE2ODc3LDQxLjE5MDgwMDIgQzIzLjEwNTk5MTEsNDEuMTkwODAwMiAyNS42MzQxMDQ2LDQxLjAyNTA1OCAyNi41NzMxODA1LDQwLjYwNjY1MjUgQzI3LjIwMTU2NzcsNDAuNDIyOTk2NCAyNy44MTA5NTA2LDQwLjA1MzgxNTEgMjguMzYxMTM5OSwzOS42MTMyMTE5IEMyOS42OTgxMzczLDM4LjU0MjE5NjUgMzAuNjU2NDUxMSwzNy4wNzAzIDMxLjE0NTczMzIsMzUuNDI4NTMzMyBMMzUuMTI0NDAyNCwyMy42MzQ0MzQ3IEMzNS40OTgyNTcsMjIuNTg5MzU1NCAzNC43OTgyOTIyLDIxLjQzOTA1MTcgMzMuNzUzMTM1MSwyMS4wNjUxOTcxIiBpZD0iRmlsbC0xIiBmaWxsPSIjRTJCQjBFIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMy4zMjUyNjcsIDIzLjg2MTA4NCkgcm90YXRlKC01Ni4wMDAwMDApIHRyYW5zbGF0ZSgtMjMuMzI1MjY3LCAtMjMuODYxMDg0KSAiPjwvcGF0aD4KICAgICAgICA8cGF0aCBkPSJNMzYuODE5Nzg1NSwyMC4zNDMwMjkyIEwzNi43MTc2NzY1LDIwLjMwNjUwMDUgQzM1LjY3MjU5NzIsMTkuOTMyNzIzOCAzNC41MjIyOTM1LDIwLjQ3NjkxNTggMzQuMTQ4NTE2OCwyMS41MjIwNzMgTDMyLjQ4MjY4MzIsMjYuOTExODg3MyBMMzIuNjM4NDU2LDIzLjcyMzA2MzggTDMyLjYzODQ1NiwyMy4zMzM2MzE5IEwzMi42Mzg0NTYsOS41OTc2NzA0NiBDMzIuNjM4NDU2LDguNTgwNzA4MTkgMzEuODE0MTA2Nyw3Ljc1NjM1ODkxIDMwLjc5NzIyMjMsNy43NTYzNTg5MSBMMzAuMzUxNzEyMyw3Ljc1NjM1ODkxIEMyOS4zMzQ4Mjc5LDcuNzU2MzU4OTEgMjguNTEwNDc4Niw4LjU4MDcwODE5IDI4LjUxMDQ3ODYsOS41OTc2NzA0NiBMMjguNTEwNDc4NiwyMy4wNjEwMjk3IEMyOC41MTA0Nzg2LDIzLjIxMTU4NCAyOC4zODg0MzA3LDIzLjMzMzYzMTkgMjguMjM3ODc2MywyMy4zMzM2MzE5IEMyOC4wODczMjIsMjMuMzMzNjMxOSAyNy45NjUyNzQxLDIzLjIxMTU4NCAyNy45NjUyNzQxLDIzLjA2MTAyOTcgTDI3Ljk2NTI3NDEsNy42Nzk4NzQ1IEMyNy45NjUyNzQxLDYuNjQ2NzExODYgMjcuMTI3NzYyLDUuODA5MTk5NzggMjYuMDk0NTk5Myw1LjgwOTE5OTc4IEwyNS43MDc5NzE0LDUuODA5MTk5NzggQzI0LjY3NDgwODgsNS44MDkxOTk3OCAyMy44MzcyOTY3LDYuNjQ2NzExODYgMjMuODM3Mjk2Nyw3LjY3OTg3NDUgTDIzLjgzNzI5NjcsMjMuMDYxMDI5NyBDMjMuODM3Mjk2NywyMy4yMTE1ODQgMjMuNzE1MjQ4OCwyMy4zMzM2MzE5IDIzLjU2NDY5NDQsMjMuMzMzNjMxOSBDMjMuNDE0MTQwMSwyMy4zMzM2MzE5IDIzLjI5MjA5MjIsMjMuMjExNTg0IDIzLjI5MjA5MjIsMjMuMDYxMDI5NyBMMjMuMjkyMDkyMiwxMC40ODA5Nzk3IEMyMy4yOTIwOTIyLDkuNDQ3ODE3MSAyMi40NTQ1ODAxLDguNjEwMzA1MDEgMjEuNDIxNDE3NCw4LjYxMDMwNTAxIEwyMS4wMzQ3ODk1LDguNjEwMzA1MDEgQzIwLjAwMTYyNjksOC42MTAzMDUwMSAxOS4xNjQxMTQ4LDkuNDQ3ODE3MSAxOS4xNjQxMTQ4LDEwLjQ4MDk3OTcgTDE5LjE2NDExNDgsMjMuMDYxMDI5NyBDMTkuMTY0MTE0OCwyMy4yMTE1ODQgMTkuMDQyMDY2OSwyMy4zMzM2MzE5IDE4Ljg5MTUxMjUsMjMuMzMzNjMxOSBDMTguNzQwOTU4MiwyMy4zMzM2MzE5IDE4LjYxODkxMDMsMjMuMjExNTg0IDE4LjYxODkxMDMsMjMuMDYxMDI5NyBMMTguNjE4OTEwMywxNC4zNjY1NzQ3IEMxOC42MTg5MTAzLDEzLjM4Mjg2OTkgMTcuODIxNDMxOCwxMi41ODUzMTM1IDE2LjgzNzY0OTEsMTIuNTg1MzEzNSBMMTYuMjcyMTk0MSwxMi41ODUzMTM1IEMxNS4yODg0MTE0LDEyLjU4NTMxMzUgMTQuNDkwOTMyOSwxMy4zODI4Njk5IDE0LjQ5MDkzMjksMTQuMzY2NTc0NyBMMTQuNDkwOTMyOSwyMy4zMzM2MzE5IEwxNC40OTA5MzI5LDIzLjcyMzA2MzggTDE0LjQ5MDkzMjksMzIuOTA4NTE0MyBDMTQuNDkwOTMyOSwzNy4wODM4NDY2IDE3Ljg3NTcxODYsNDAuNDY4NjMyMyAyMi4wNTEwNTA4LDQwLjQ2ODYzMjMgTDI1LjA3ODMzODEsNDAuNDY4NjMyMyBDMjYuMTcyNjQxNSw0MC40Njg2MzIzIDI4LjcwMDc1NSw0MC4zMDI4OTAxIDI5LjYzOTgzMDksMzkuODg0NDg0NSBDMzAuMjY4MjE4MSwzOS43MDA4Mjg1IDMwLjg3NzYwMSwzOS4zMzE2NDcxIDMxLjQyNzc5MDMsMzguODkxMDQzOSBDMzIuNzY0Nzg3NywzNy44MjAwMjg1IDMzLjcyMzEwMTUsMzYuMzQ4MTMyIDM0LjIxMjM4MzYsMzQuNzA2MzY1MyBMMzguMTkxMDUyOCwyMi45MTIyNjY3IEMzOC41NjQ5MDc0LDIxLjg2NzE4NzQgMzcuODY0OTQyNiwyMC43MTY4ODM3IDM2LjgxOTc4NTUsMjAuMzQzMDI5MiIgaWQ9IkZpbGwtMSIgZmlsbD0iI0ZGRDYyMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjYuMzkxOTE4LCAyMy4xMzg5MTYpIHJvdGF0ZSgtNTYuMDAwMDAwKSB0cmFuc2xhdGUoLTI2LjM5MTkxOCwgLTIzLjEzODkxNikgIj48L3BhdGg+CiAgICAgICAgPGxpbmUgeDE9IjI0LjIyNTA1ODYiIHkxPSI5LjUyNzA5OTYxIiB4Mj0iMjEuNzg3NTU4NiIgeTI9IjUuNjM3ODE1NjQiIGlkPSJQYXRoLTgiIHN0cm9rZT0iIzFBQjZCQSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvbGluZT4KICAgICAgICA8bGluZSB4MT0iMzUuNTYwMjYzNyIgeTE9IjEwLjMwNjE1MjMiIHgyPSIzMy4xMjI3NjM3IiB5Mj0iNi40MTY4NjgzNyIgaWQ9IlBhdGgtOCIgc3Ryb2tlPSIjMUFCNkJBIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQuMzQxNTE0LCA4LjM2MTUxMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMzQuMzQxNTE0LCAtOC4zNjE1MTApICI+PC9saW5lPgogICAgICAgIDxsaW5lIHgxPSIxNy4yOTEzNTcyIiB5MT0iMzguODg0MTY5MiIgeDI9IjEzLjYwNjQ1NzMiIHkyPSI0NS4zNjQ4ODgzIiBpZD0iUGF0aC0xMSIgc3Ryb2tlPSIjMUFCNkJBIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9saW5lPgogICAgICAgIDxsaW5lIHgxPSIyMS4yMjYxMDU0IiB5MT0iNDAuNzA1NDg2OCIgeDI9IjIxLjcxMTk2NiIgeTI9IjQ1LjI2OTY4MTgiIGlkPSJQYXRoLTgiIHN0cm9rZT0iIzFBQjZCQSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvbGluZT4KICAgICAgICA8bGluZSB4MT0iMTMuNTcwNDE1MyIgeTE9IjM2LjEwNDc4MTciIHgyPSI5LjY3NDY1NDk2IiB5Mj0iMzguNTMxOTE3MyIgaWQ9IlBhdGgtOCIgc3Ryb2tlPSIjMUFCNkJBIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9saW5lPgogICAgICAgIDxsaW5lIHgxPSIyOC45NTI1MTI1IiB5MT0iOS4yMzc2NjkxNSIgeDI9IjI5LjQyMzUxODQiIHkyPSIxLjc5NzQ4MzYiIGlkPSJQYXRoLTExIiBzdHJva2U9IiMxQUI2QkEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L2xpbmU+CiAgICA8L2c+Cjwvc3ZnPg==",
  smile:
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDdweCIgaGVpZ2h0PSI0N3B4IiB2aWV3Qm94PSIwIDAgNDcgNDciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+c21pbGUtbGc8L3RpdGxlPgogICAgPGcgaWQ9InNtaWxlLWxnIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBmaWxsPSIjRkZEMTA1IiBjeD0iMjMuNSIgY3k9IjIzLjUiIHI9IjIyLjUiPjwvY2lyY2xlPgogICAgICAgIDxnIGlkPSJHcm91cC0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC4wMDAwMDAsIDE3LjAwMDAwMCkiIHN0cm9rZT0iIzNGM0Y0NCI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjQiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTE4LjA4OTQ1MzEsMy4wNTg3ODkwNiBDMTkuNTc3MzQ1NywxLjM4NzAzNDI4IDIxLjIyNzU0MSwwLjU1MjcxODUyNyAyMy4wNDAwMzkxLDAuNTU1ODQxODA0IEMyNC44NDY3NjExLDAuNTU4OTc4NTE4IDI2LjQ3NTAxNjMsMS4zOTY0ODQzOCAyNy45MjQ4MDQ3LDMuMDY4MzU5MzgiIGlkPSJyaWdodC1leWUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDMuMDU4Nzg5MDYgQzEuNDg3ODkyNTksMS4zODcwMzQyOCAzLjEzODA4NzksMC41NTI3MTg1MjcgNC45NTA1ODU5NCwwLjU1NTg0MTgwNCBDNi43NTczMDc5NCwwLjU1ODk3ODUxOCA4LjM4NTU2MzE1LDEuMzk2NDg0MzggOS44MzUzNTE1NiwzLjA2ODM1OTM4IiBpZD0ibGVmdC1leWUiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8cGF0aCBkPSJNMTMuOTQ2MzEzNiwxOSBDOS4wNTU3MDU2LDE5IDUuNDA2OTM0NCwxNi42NjY2NjY3IDMsMTIgTDMsMTIgTDI0LDEyIEwyNCwxMiBDMjIuMTg4MTUwNCwxNi42NjY2NjY3IDE4LjgzNjkyMTYsMTkgMTMuOTQ2MzEzNiwxOSBaIiBpZD0iUGF0aC0yIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9IiMzRjNGNDQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==",
  dolphin:
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBMaWNlbnNlOiBNSVQuIE1hZGUgYnkgVHdpdHRlcjogaHR0cHM6Ly9naXRodWIuY29tL3R3aXR0ZXIvdHdlbW9qaSAtLT4KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAzNiAzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyIgY2xhc3M9Imljb25pZnkgaWNvbmlmeS0tdHdlbW9qaSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCI+PHBhdGggZmlsbD0iIzQyOTJFMCIgZD0iTTMwLjU4NCA3Ljg1NEExMC40MzcgMTAuNDM3IDAgMCAxIDMzLjU1OSAyYy43MDQtLjcwNC4yNS0yLTEtMmMwIDAtNi4wNjEuMDA3LTkuODkzIDMuMzI3QTE1LjAwMyAxNS4wMDMgMCAwIDAgMTkuNTU5IDNjLTggMC0xMiA0LTE0IDEyYy0uNDQ0IDEuNzc4LS44NjUgMS4zOTktMyAzYy0xLjE5NS44OTYtMi4xMTcgMyAxIDNjMyAwIDUgLjk1NCA5IDFjMy42MjkuMDQyIDkuNTA0LTMuMjI5IDExLjA4Ny0xLjI5MmMyLjIxMSAyLjcwNiAxLjM5NiA1LjQzOC41OTcgNi42NjZjLTIuOTA0IDMuMzk2LTUuOTM5LjU0MS04LjY4NS0uMzc0Yy0zLTEtMSAxIDAgMnMxLjMxMiA0IDAgNnMzIDAgNS0zYy4wMTEtLjAxNy4wMjItLjAyOC4wMzItLjA0NUMyOC4zOTIgMzEuNSAzNC41NTkgMjUuOTM2IDM0LjU1OSAxOGMwLTMuOTE4LTEuNTE1LTcuNDc0LTMuOTc1LTEwLjE0NnoiPjwvcGF0aD48Y2lyY2xlIGZpbGw9IiMxRjIzMjYiIGN4PSIxMy4xMTciIGN5PSIxNCIgcj0iMiI+PC9jaXJjbGU+PHBhdGggZmlsbD0iIzc3QkNGNyIgZD0iTTEwLjM5NiAyMS44OTZzNC0uODc2IDcuMTY3LTIuNjg4YzQuNjI1LTIuNjQ2IDcuMjYtMi41OTQgOC44ODUtLjgyM3MxLjk5IDYuNTk0LTIuODg1IDkuNjc3YzIuNjA0LTIuNzUgMS4xNDYtOC4zNDktMi4wMTQtNy41ODhjLTguMTUzIDEuOTY0LTguOTAzIDEuNTQ3LTExLjE1MyAxLjQyMnoiPjwvcGF0aD48cGF0aCBmaWxsPSIjNDI5MkUwIiBkPSJNMTkuMzgzIDE3Ljc0NGwtMi45MjIgMS4yODVhLjU0LjU0IDAgMCAwLS40MTIuNTYxYy4xMjIgMS41MDQuNzU2IDMuNjI1IDIuMjYzIDQuNjI5YzIuMzU0IDEuNTY5IDIuMzY3IDEuODk3IDMgMGMuNzY4LTIuMzAzLS4xODItNC40NjItMS4zMzMtNi4yNGEuNTUzLjU1MyAwIDAgMC0uNTk2LS4yMzV6Ij48L3BhdGg+PC9zdmc+",
};

const calculateAlpha = (yCurrent, yStart, yEnd) => {
  const yMid = (yStart - yEnd) / 2;
  const alpha = 1 - Math.abs(yMid - (yCurrent - 20)) / yMid;
  return alpha < 0 ? 0 : alpha;
};

export default class Animation {
  canvasEl;
  ctx;
  render;
  images = {};
  animate;

  constructor(elem) {
    this.canvasEl = elem;
    this.setCanvasSize();
    this.ctx = this.canvasEl.getContext("2d");
    this.render = anime({
      duration: Infinity,
      update: () => {
        this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
      },
    });
  }

  loadImage(name) {
    if (this.images[name]) {
      return this.images[name];
    }

    const image = new Image();
    image.src = emojiUrlLookup[name];
    this.images[name] = image;
    return image;
  }

  setCanvasSize() {
    this.canvasRect = this.canvasEl.getBoundingClientRect();
    this.canvasEl.width = this.canvasRect.width;
    this.canvasEl.height = this.canvasRect.height;
    this.canvasEl.getContext("2d").scale(1, 1);
  }

  setParticuleDirection(p) {
    const angle = 1.55;
    const radius = -this.canvasRect.height;
    return {
      x: p.x + radius * Math.cos(angle),
      y: p.y + radius * Math.sin(angle),
    };
  }

  createParticule(img) {
    const p = {};
    const x = anime.random(30, 60);
    const yBase = this.canvasRect.height - 78;
    const yWiggle = 30;
    const y = anime.random(yBase - yWiggle / 2, yBase + yWiggle / 2);
    p.startPos = { x, y };
    p.x = x;
    p.y = y;
    p.radius = anime.random(24, 48);
    p.endPos = this.setParticuleDirection(p);
    p.draw = () => {
      this.ctx.globalAlpha = calculateAlpha(+p.y, p.startPos.y, p.endPos.y);
      this.ctx.drawImage(img, p.x, p.y, p.radius, p.radius);
    };
    return p;
  }

  renderParticule(anim) {
    anim.animatables.forEach((i) => i.target.draw());
  }

  animateParticules(img) {
    const particules = [this.createParticule(img)];

    anime.timeline().add({
      targets: particules,
      x: (p) => p.endPos.x,
      y: (p) => p.endPos.y,
      radius: anime.random(10, 80),
      duration: anime.random(12000, 15000),
      easing: "easeOutExpo",
      update: this.renderParticule,
    });
  }

  fireAnimation(name) {
    const img = this.loadImage(name);
    if (this.animate) {
      this.animate(img);
    } else {
      this.animate = debounce(10, (image) => {
        this.render.play();
        this.animateParticules(image);
      });
      this.animate(img);
    }
  }
}
