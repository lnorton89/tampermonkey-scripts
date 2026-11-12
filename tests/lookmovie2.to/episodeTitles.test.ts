import { describe, expect, it } from 'vitest';
import { parseEpisodeTitles } from '../../scripts/lookmovie2.to/src/features/episodeTitles';

describe('parseEpisodeTitles', () => {
  it('reads titles by episode id from the play page seasons list', () => {
    const html = `
      window.show_storage = {
        id_show: 1689963401,
        seasons: [
                {
                    title: 'Evolution: Brain Power',
                    index: '304',
                    episode: '13',
                    id_episode: 465001,
                    season: '53'
                },
                {
                    title: 'Evolution: On the Run',
                    index: '305',
                    episode: '17',
                    id_episode: 470109,
                    season: '53'
                },
        ]
      };`;

    expect(parseEpisodeTitles(html)).toEqual({
      '465001': 'Evolution: Brain Power',
      '470109': 'Evolution: On the Run',
    });
  });

  it('unescapes quotes and skips entries without a title', () => {
    const html = String.raw`{ title: 'It\'s Alive', id_episode: 1 } { title: '', id_episode: 2 } { id_episode: 3 } { title: 'Episode 4', id_episode: 4 }`;
    expect(parseEpisodeTitles(html)).toEqual({ '1': "It's Alive" });
  });
});
