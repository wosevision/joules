#!/usr/bin/env python

import atexit

from clear import clear_exit

def exit_handler():
    print 'Exit signal detected!'
    clear_exit()

atexit.register(exit_handler)
