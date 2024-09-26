import * as React from 'react';

export const EmailTemplate = ({
      body,
  }: any) => (
      <div>
          <h1>
                New Meeting Request! 🚀
          </h1>
          <p>
              New Meeting Request from {body.fullName} ({body.email}) at {body.avaibleHour} on {body.date}.
          </p>
      </div>
);
