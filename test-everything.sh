#!/bin/bash

echo "**Testing Application Layer Unit Tests**"
cd BudgetSquirrel.Api.Tests
dotnet test --filter "FullyQualifiedName~BudgetSquirrel.Api.Tests.UnitTests"

echo "**Testing Business Layer Unit Tests**"
cd ..
cd BudgetTracker/Tests/BudgetTracker.Business.Tests
dotnet test --filter "FullyQualifiedName~BudgetTracker.Business.Tests.UnitTests"

echo "**Testing Application Layer Integration Tests**"
cd ../../..
cd BudgetSquirrel.Api.Tests
dotnet test --filter "FullyQualifiedName~BudgetSquirrel.Api.Tests.IntegrationTests"
