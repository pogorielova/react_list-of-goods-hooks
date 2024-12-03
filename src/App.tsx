import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';
import { useState } from 'react';
import { Good } from './components/Good';
import { GoodType } from './types/GoodType';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const goodsWithIds: GoodType[] = goodsFromServer.map((good, index) => {
  return {
    name: good,
    id: index,
  };
});

enum SortType {
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

function getPreparedGoods(
  goods: GoodType[],
  { sortField }: { sortField: SortType },
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabet:
          return good1.name.localeCompare(good2.name);
        case SortType.Length:
          return good1.name.length - good2.name.length;
        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Default);
  const [reversed, setReversed] = useState(false);

  let visibleGoods = getPreparedGoods(goodsWithIds, { sortField });

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
          onClick={() => {
            setSortField(SortType.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortType.Length);
          }}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {sortField || reversed ? (
          <button
            onClick={() => {
              setSortField(SortType.Default);
              setReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return <Good key={good.id} good={good} />;
        })}
      </ul>
    </div>
  );
};
