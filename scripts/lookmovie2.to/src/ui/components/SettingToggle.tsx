/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID } from '../../config/constants';
import { saveSettings } from '../../core/settings';
import { appState } from '../../core/state';

export function SettingToggle({ settingKey, title, copy }) {
  const checked = !!appState.settings[settingKey];

  return (
    <label className={`${SCRIPT_ID}-setting`}>
      <div>
        <p className={`${SCRIPT_ID}-setting-title`}>{title}</p>
        <p className={`${SCRIPT_ID}-setting-copy`}>{copy}</p>
      </div>
      <span className={`${SCRIPT_ID}-switch`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => {
            saveSettings({
              ...appState.settings,
              [settingKey]: event.currentTarget.checked,
            });
          }}
        />
        <span className={`${SCRIPT_ID}-slider`} />
      </span>
    </label>
  );
}
