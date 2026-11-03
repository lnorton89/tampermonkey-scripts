/* eslint-disable */
// @ts-nocheck
import { useRef, useState } from 'react';
import { SCRIPT_ID } from '../../config/constants';
import {
  exportBackup,
  getBackupSnapshots,
  importBackupFile,
  restoreBackupSnapshot,
} from '../../features/backup';

export function BackupControls() {
  const fileInput = useRef(null);
  const [status, setStatus] = useState('');
  const snapshots = getBackupSnapshots();
  const [selectedDate, setSelectedDate] = useState('');
  const activeDate = selectedDate || (snapshots[0] && snapshots[0].date) || '';

  return (
    <div className={`${SCRIPT_ID}-setting ${SCRIPT_ID}-setting-stack`}>
      <div>
        <p className={`${SCRIPT_ID}-setting-title`}>Watchlist backup</p>
        <p className={`${SCRIPT_ID}-setting-copy`}>
          Watchlists are kept in Tampermonkey storage with a daily snapshot for the last 14 days.
          Export a file now and then for a copy outside the browser. Restoring only adds missing
          entries.
        </p>
      </div>
      <div className={`${SCRIPT_ID}-backup-actions`}>
        <button className={`${SCRIPT_ID}-button`} type="button" onClick={() => exportBackup()}>
          Export file
        </button>
        <button
          className={`${SCRIPT_ID}-button`}
          type="button"
          onClick={() => fileInput.current && fileInput.current.click()}
        >
          Import file
        </button>
        <input
          ref={fileInput}
          className={`${SCRIPT_ID}-file-input`}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={async (event) => {
            const file = event.currentTarget.files && event.currentTarget.files[0];
            event.currentTarget.value = '';
            if (file) {
              setStatus(await importBackupFile(file));
            }
          }}
        />
      </div>
      {snapshots.length ? (
        <div className={`${SCRIPT_ID}-backup-actions`}>
          <label className={`${SCRIPT_ID}-field`}>
            <span>Snapshot</span>
            <select
              value={activeDate}
              onChange={(event) => setSelectedDate(event.currentTarget.value)}
            >
              {snapshots.map((snapshot) => (
                <option key={snapshot.date} value={snapshot.date}>
                  {snapshot.date} ({snapshot.showCount} shows, {snapshot.movieCount} movies)
                </option>
              ))}
            </select>
          </label>
          <button
            className={`${SCRIPT_ID}-button`}
            type="button"
            onClick={() => setStatus(restoreBackupSnapshot(activeDate))}
          >
            Restore
          </button>
        </div>
      ) : null}
      {status ? <p className={`${SCRIPT_ID}-ntfy-status`}>{status}</p> : null}
    </div>
  );
}
