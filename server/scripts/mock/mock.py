#!/usr/bin/env python

import sys
import threading


def tick(interval=0.1):
    timer = threading.Timer(interval, tick, [interval])

    try:
        print("Tick!\n")
        timer.start()
    except KeyboardInterrupt:
        print("End of program")
        timer.cancel()
        sys.exit(0)


print("""
Threaded ticker; mock resource with long
running process to simulate a Python script
executing as a Node child process.
""")

tick()
