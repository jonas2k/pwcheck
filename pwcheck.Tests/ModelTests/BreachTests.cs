using pwcheck.Models;
using System;
using Xunit;

namespace pwcheck.Tests.ModelTests {
    public class BreachTests {

        [Fact]
        public void ParseDateIsCorrect() {
            //Arrange
            Breach breach = new Breach {
                AddedDate = "2016-10-08T07:46:05Z",
                BreachDate = "2015-03-01"
            };

            // Act
            string FormattedAddedDate = breach.GetFormattedAddedDate();
            string FormattedBreachDate = breach.GetFormattedBreachDate();

            // Assert
            Assert.Equal("08.10.2016", FormattedAddedDate);
            Assert.Equal("01.03.2015", FormattedBreachDate);
        }
    }
}