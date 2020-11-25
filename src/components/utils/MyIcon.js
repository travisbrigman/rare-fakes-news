import React from 'react';
import { Blank } from 'grommet-icons';
import {clap} from './clap.svg';

export const MyIcon = props => (
  <Blank {...props}>
    {/* your 24x24 svg goes here - e.g. here's a 24x24px circle */}

    <svg viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <clap/>
    </svg>
  </Blank>
);