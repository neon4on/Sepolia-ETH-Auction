async function main() {
  // Получаем контрактную фабрику
  const Auction = await ethers.getContractFactory('Auction');

  // Деплоим контракт
  const auction = await Auction.deploy();

  // Ожидаем завершения развертывания
  await auction.deploymentTransaction().wait();

  console.log('Auction deployed to:', auction.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
