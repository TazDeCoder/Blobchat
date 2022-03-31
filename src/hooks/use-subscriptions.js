import { useState } from "react";

function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  const addSubscription = (subscription) => {
    setSubscriptions((prevSubscriptions) => {
      const updatedSubscriptions = prevSubscriptions.concat(subscription);
      return updatedSubscriptions;
    });
  };

  const removeSubscriptions = () => {
    setSubscriptions((prevSubscriptions) => {
      prevSubscriptions.forEach((subscription) => subscription.unsubscribe());
      return [];
    });
  };

  return {
    addSubscription,
    removeSubscriptions,
  };
}

export default useSubscriptions;
