import { render, screen } from '@testing-library/react';
import SwitchTable from './SwitchTable';

const stageEdit = jest.fn();
const stageDelete = jest.fn();

describe('SwitchTable component', () => {
  it('should render component correctly', () => {
    render(
      <SwitchTable data={[]} stageEdit={stageEdit} stageDelete={stageDelete} />,
    );
    expect(screen.getByTestId('switch-table')).toBeInTheDocument();
  });
});
