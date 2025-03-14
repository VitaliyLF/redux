import { memo, useMemo, useState } from 'react'

import {
  AppState,
  User,
  UserId,
  UserRemoveSelectedAction,
  UserSelectedAction,
  createAppSelector,
  useAppDispatch,
  useAppSelector,
} from '@/shared/store/counters'

const selectSortedUsers = createAppSelector(
  // достали ids
  (state: AppState) => state.users.ids,
  // достали entities
  (state: AppState) => state.users.entities,
  // достаем параметр сортировки
  (_: AppState, sort: 'asc' | 'desc') => sort,
  // теперь делаем логику
  (ids, entities, sort) =>
    ids
      .map((id) => entities[id])
      .sort((a, b) => {
        if (sort === 'asc') {
          return a.name.localeCompare(b.name)
        } else {
          return b.name.localeCompare(a.name)
        }
      }),
)

const selectSelectedUser = (state: AppState) =>
  state.users.selectedUserId ? state.users.entities[state.users.selectedUserId] : undefined

const UsersList = () => {
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc')
  console.log('render user list')

  // 1 вариант не красивый
  // достаем id из стора
  // Здесь я беру только нужные поля из стора
  // const ids = useAppSelector((state) => state.users.ids)
  // const entities = useAppSelector((state) => state.users.entities)
  // const selectedUserId = useAppSelector((state) => state.users.selectedUserId)
  // const selectedUser = selectedUserId ? entities[selectedUserId] : undefined

  // всю тяжелую логику я делаю не в селеторе useAppSelector а в компоненте
  // const sortedUsers = useMemo(
  //   () =>
  //     ids
  //       .map((id) => entities[id])
  //       .sort((a, b) => {
  //         if (sortType === 'asc') {
  //           return a.name.localeCompare(b.name)
  //         } else {
  //           return b.name.localeCompare(a.name)
  //         }
  //       }),
  //   [ids, entities, sortType],
  // )

  // 2 вариант красивый

  const sortedUsers = useAppSelector((state) => selectSortedUsers(state, sortType))

  const selectedUser = useAppSelector(selectSelectedUser)

  return (
    <>
      <div className="flex flex-col items-center">
        {!selectedUser ? (
          <div className="flex flex-col items-center justify-between">
            <div className="flex flex-row items-center">
              <button
                onClick={() => setSortType('asc')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Asc
              </button>
              <button
                onClick={() => setSortType('desc')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
                Desc
              </button>
            </div>
            <ul className="list-none">
              {sortedUsers.map((user) => (
                <UserListItem user={user} key={user.id} />
              ))}
            </ul>
          </div>
        ) : (
          selectedUser && <SelectedUser user={selectedUser} />
        )}
      </div>
    </>
  )
}

export default UsersList

const UserListItem = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch()

  const handleUserClick = () => {
    dispatch({ type: 'userSelected', payload: { userId: user.id } } satisfies UserSelectedAction)
  }

  return (
    <li key={user.id} className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  )
}

function SelectedUser({ user }: { user: User }) {
  const dispatch = useAppDispatch()

  const handleBackButtonClick = () => {
    dispatch({
      type: 'userRemoveSelected',
    } satisfies UserRemoveSelectedAction)
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleBackButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md">
        Back
      </button>
      <h2 className="text-3xl">{user.name}</h2>
      <p className="text-xl">{user.description}</p>
    </div>
  )
}
