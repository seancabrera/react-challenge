import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent, {
  PointerEventsCheckLevel
} from '@testing-library/user-event';
import App from './App';
import '@testing-library/jest-dom';

const mockPokemonList = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
  { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
  { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
  { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7' },
  { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
  { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
  { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10' },
  { name: 'metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/' },
  { name: 'butterfree', url: 'https://pokeapi.co/api/v2/pokemon/12' },
  { name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/13/' },
  { name: 'kakuna', url: 'https://pokeapi.co/api/v2/pokemon/14/' },
  { name: 'beedrill', url: 'https://pokeapi.co/api/v2/pokemon/15' }
];

const mockPokemonDetails = {
  name: 'Bulbasaur',
  abilities: [
    {
      ability: 'overgrow',
      abilityEffect:
        'When This Pokémon Has 1/3 Or Less Of Its HP Remaining, Its Grass-Type Moves Inflict 1.5× As Much Regular Damage.'
    },
    {
      ability: 'chlorophyll',
      abilityEffect:
        "This Pokémon's Speed Is Doubled During Strong Sunlight. This Bonus Does Not Count As A Stat Modifier."
    }
  ]
};

function verifyPage1Data() {
  expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
  expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  expect(screen.getByText('ivysaur')).toBeInTheDocument();
  expect(screen.getByText('venusaur')).toBeInTheDocument();
  expect(screen.getByText('charmander')).toBeInTheDocument();
  expect(screen.getByText('charmeleon')).toBeInTheDocument();
}

function verifyPage2Data() {
  expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
  expect(screen.getByText('charizard')).toBeInTheDocument();
  expect(screen.getByText('squirtle')).toBeInTheDocument();
  expect(screen.getByText('wartortle')).toBeInTheDocument();
  expect(screen.getByText('blastoise')).toBeInTheDocument();
  expect(screen.getByText('caterpie')).toBeInTheDocument();
}

function verifyPage3Data() {
  expect(screen.getByText('Page 3 of 3')).toBeInTheDocument();
  expect(screen.getByText('metapod')).toBeInTheDocument();
  expect(screen.getByText('butterfree')).toBeInTheDocument();
  expect(screen.getByText('weedle')).toBeInTheDocument();
  expect(screen.getByText('kakuna')).toBeInTheDocument();
  expect(screen.getByText('beedrill')).toBeInTheDocument();
}

function verifyDetailsView() {
  const heading = screen.getByRole('heading');
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent(/bulbasaur/i);

  mockPokemonDetails.abilities.forEach((ability) => {
    expect(screen.getByText(ability.ability)).toBeInTheDocument();
    expect(screen.getByText(ability.abilityEffect)).toBeInTheDocument();
  });
}

vi.mock('hooks/useFetchPokemonList', () => ({
  default: (page: number) => ({
    isPending: false,
    error: false,
    data: {
      count: 15,
      results: mockPokemonList.slice((page - 1) * 5, page * 5)
    }
  })
}));

vi.mock('hooks/useFetchPokemonDetails', () => ({
  default: () => ({
    isPending: false,
    error: false,
    data: mockPokemonDetails
  })
}));

describe('App Component', () => {
  it('renders PokemonList initially', () => {
    render(<App />);

    verifyPage1Data();
  });

  it('renders PokemonDetails when a Pokemon is selected and PokemonList when back link is clicked', async () => {
    render(<App />);

    // Triggering a click on Bulbasaur
    const user = userEvent.setup();
    await user.click(screen.getByText('bulbasaur'));
    verifyDetailsView();

    // Click on back link
    await user.click(screen.getByText(/back/i));
    verifyPage1Data();
  });
});

describe('Pagination', () => {
  it('updates pokemon by page', async () => {
    render(<App />);

    verifyPage1Data();

    // Triggering a click on next page
    const user = userEvent.setup();
    await user.click(screen.getByTestId('ChevronRightIcon'));
    verifyPage2Data();

    // Triggering a click on next page
    await user.click(screen.getByTestId('ChevronRightIcon'));
    verifyPage3Data();

    // Triggering a click on prev page
    await user.click(screen.getByTestId('ChevronLeftIcon'));
    verifyPage2Data();

    // Triggering a click on prev page
    await user.click(screen.getByTestId('ChevronLeftIcon'));
    verifyPage1Data();

    // Triggering a click on last page
    await user.click(screen.getByTestId('LastPageIcon'));
    verifyPage3Data();

    // Triggering a click on first page
    await user.click(screen.getByTestId('FirstPageIcon'));
    verifyPage1Data();
  });

  it('disables buttons at boundaries', async () => {
    render(<App />);

    verifyPage1Data();

    // Triggering a click on prev page
    await userEvent.click(screen.getByTestId('ChevronLeftIcon'), {
      pointerEventsCheck: PointerEventsCheckLevel.Never
    });
    // should stay on page 1
    verifyPage1Data();

    // Triggering a click on first page
    await userEvent.click(screen.getByTestId('FirstPageIcon'), {
      pointerEventsCheck: PointerEventsCheckLevel.Never
    });
    // should stay on page 1
    verifyPage1Data();

    // Navigate to last page
    await userEvent.click(screen.getByTestId('LastPageIcon'), {
      pointerEventsCheck: PointerEventsCheckLevel.Never
    });
    verifyPage3Data();

    // Triggering a click on next page
    await userEvent.click(screen.getByTestId('ChevronRightIcon'), {
      pointerEventsCheck: PointerEventsCheckLevel.Never
    });
    // should stay on page 3
    verifyPage3Data();

    // Triggering a click on last page
    await userEvent.click(screen.getByTestId('LastPageIcon'), {
      pointerEventsCheck: PointerEventsCheckLevel.Never
    });
    // should stay on page 3
    verifyPage3Data();
  });
});
